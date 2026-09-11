const Joi = require('joi');

const budgetSchema = Joi.object({
  month: Joi.string().pattern(/^\d{4}-\d{2}$/).required().messages({
    'string.pattern.base': 'Month must be in YYYY-MM format',
  }),
  categories: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        allocated: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
});

module.exports = { budgetSchema };