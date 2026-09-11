// user.service.js — Business logic for user profiles

const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/AppError');

const registerUserProfile = async (uid, email, fullName, phone) => {
  // Check if profile already exists (prevent duplicate registration)
  const existing = await userRepository.getUserProfile(uid);
  if (existing) {
    throw new AppError('Profile already exists', 400, 'PROFILE_EXISTS');
  }

  const newProfile = {
    email,
    fullName,
    phone,
    role: 'customer', // 👈 everyone registers as 'customer' by default
    kycStatus: 'pending',
    creditScore: 300, // starting base score (we'll build real logic in Phase 8)
    createdAt: new Date().toISOString(),
  };

  return userRepository.createUserProfile(uid, newProfile);
};

const getProfile = async (uid) => {
  const profile = await userRepository.getUserProfile(uid);
  if (!profile) {
    throw new AppError('Profile not found', 404, 'PROFILE_NOT_FOUND');
  }
  return profile;
};

module.exports = { registerUserProfile, getProfile };