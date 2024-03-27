const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  //"Bearer" is not used here ...

  if (!token) {
    return res.status(401).json('Unauthorization');
  }

  jwt.verify(token, config.auth.secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
