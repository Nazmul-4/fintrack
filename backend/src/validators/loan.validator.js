const Joi = require('joi');

const loanApplicationSchema = Joi.object({
  amount: Joi.number().min(1000).max(100000).required().messages({
    'number.min': 'Loan amount must be at least ৳1,000',
    'number.max': 'Loan amount cannot exceed ৳100,000',
  }),
  tenureMonths: Joi.number().integer().min(1).max(36).required(),
  purpose: Joi.string().min(3).max(200).required(),
});

module.exports = { loanApplicationSchema };