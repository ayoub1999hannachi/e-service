const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token and get user data from it
    const decoded = jwt.verify(token, 'yourSecretKey'); // Replace 'yourSecretKey' with your JWT secret
    req.user = await User.findById(decoded.userId); // Attach user to request

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
