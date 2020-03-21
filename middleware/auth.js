const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req, res, next) {
  // get token from the header
  const token = req.header('x-auth-token');

  // if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorisation denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, keys.secretOrKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token in not valid' });
  }
};
