import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME || '1h' }
  );
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
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
      { sub: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME || '7d' }
    );

    res.json({ message: 'Login Successful!', accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'An error Occurred!', error });
    console.log(error);
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

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

      const accessToken = generateAccessToken({ userId: decodedToken.sub });

      res.json({ message: 'Token refreshed successfully!', accessToken });
    }
  );
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { register, login, refreshToken, getUserProfile };
