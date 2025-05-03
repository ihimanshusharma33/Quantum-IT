const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
  token = req.headers.authorization.split(' ')[1];
  try {
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};