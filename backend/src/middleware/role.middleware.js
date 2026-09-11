// role.middleware.js — Restricts routes based on user role

const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const checkRole = (allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    const profile = await userRepository.getUserProfile(req.user.uid);

    if (!profile) {
      throw new AppError('Profile not found', 404, 'PROFILE_NOT_FOUND');
    }

    if (!allowedRoles.includes(profile.role)) {
      throw new AppError('You do not have permission for this action', 403, 'FORBIDDEN');
    }

    req.user.role = profile.role; // attach role for convenience later
    next();
  });
};

module.exports = { checkRole };