import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Authorization header is missing!' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token is missing!' });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = { id: decodedToken.sub };
    next();
  } catch (error) {
    if (error.name == 'TokenExpiredError') {
      res.status(401).json({
        message: 'Token Expired!',
      });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Invalid Token!' });
    } else {
      res.status(500).json({ message: 'Authentication Failed!', error });
    }
  }
};

export default authenticate;
