// admin.routes.js — Admin-only test route

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { checkRole } = require('../middleware/role.middleware');

router.get('/test', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ success: true, message: 'Welcome, Admin! You have access.' });
});

module.exports = router;