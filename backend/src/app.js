const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./utils/logger');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');


// Initialize Express app
const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
// Base health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'FinTrack API is running' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error(`${err.message} | ${req.method} ${req.originalUrl}`);
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Something went wrong',
    },
  });
});



module.exports = app;