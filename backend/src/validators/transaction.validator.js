const Joi = require('joi');

const transactionSchema = Joi.object({
  type: Joi.string().valid('income', 'expense').required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().min(2).max(50).required(),
  date: Joi.date().required(),
  description: Joi.string().allow('').max(200).optional(),
});

module.exports = { transactionSchema };