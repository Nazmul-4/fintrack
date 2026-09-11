// auth.middleware.js — Verifies the Firebase ID token sent from frontend

const { auth } = require('../config/firebase');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Step 1: Check if header exists and follows "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('No authentication token provided', 401, 'NO_TOKEN');
  }

  // Step 2: Extract just the token part
  const token = authHeader.split('Bearer ')[1];

  // Step 3: Ask Firebase to verify this token is real and not expired
  const decodedToken = await auth.verifyIdToken(token);

  // Step 4: Attach the decoded user info to the request object
  // Now every controller after this middleware can access req.user
  req.user = {
    uid: decodedToken.uid,
    email: decodedToken.email,
  };

  next(); // move to the next middleware/controller
});

module.exports = { verifyToken };