// app.js — This file configures our Express application (but doesn't start it yet)

const express = require('express');

// Create the Express application
const app = express();

// Middleware: allows our server to understand JSON data sent from frontend
app.use(express.json());

// A simple test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is healthy!' });
});

// Export the app so server.js can use it
module.exports = app;