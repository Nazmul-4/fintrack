// validate.middleware.js — Generic middleware that validates req.body against any Joi schema

const AppError = require('../utils/AppError');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      throw new AppError(message, 400, 'VALIDATION_ERROR');
    }

    next();
  };
};

module.exports = validate;