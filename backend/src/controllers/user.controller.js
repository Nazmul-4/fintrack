// user.controller.js — Handles HTTP request/response for user routes

const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');

const createProfile = asyncHandler(async (req, res) => {
  const { uid, email } = req.user; // came from verifyToken middleware
  const { fullName, phone } = req.body;

  const profile = await userService.registerUserProfile(uid, email, fullName, phone);

  res.status(201).json({ success: true, data: profile });
});

const getMyProfile = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const profile = await userService.getProfile(uid);

  res.status(200).json({ success: true, data: profile });
});

module.exports = { createProfile, getMyProfile };