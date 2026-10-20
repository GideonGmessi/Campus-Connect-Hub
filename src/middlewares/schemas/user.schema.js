const Joi = require('joi');

// Only "name" is editable.
exports.updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
});

exports.roleSchema = Joi.object({
  role: Joi.string().valid('user', 'admin').required(),
});

exports.statusSchema = Joi.object({
  status: Joi.string().valid('active', 'inactive').required(),
});

exports.listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().trim().max(100).allow('').default(''),
  role: Joi.string().valid('user', 'admin'),
});