const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.name == 'TokenExpiredError') {
      res.status(401).json({
        message: 'Token Expired!',
      });
    } else {
      res.json({
        message: 'Authentication Failed!',
      });
      console.log(error);
    }
  }
};

module.exports = authenticate;
