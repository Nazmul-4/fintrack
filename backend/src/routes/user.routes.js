// user.routes.js — Defines URL paths for user-related actions

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

router.post('/create-profile', verifyToken, userController.createProfile);
router.get('/profile', verifyToken, userController.getMyProfile);

module.exports = router;