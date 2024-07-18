import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User Added Successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'An error Occurred!', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password does not match!' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    res.json({ message: 'Login Successful!', accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'An error Occurred!', error });
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required!' });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token!' });
      }

      const accessToken = generateAccessToken({ userId: decodedToken.userId });

      res.json({ message: 'Token refreshed successfully!', accessToken });
    }
  );
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    }
  );
};

export default { register, login, refreshToken };
