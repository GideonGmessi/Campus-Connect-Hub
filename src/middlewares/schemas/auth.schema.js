const Joi = require('joi');

exports.registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

exports.changePasswordSchema = Joi.object({
    currentPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required()
    .invalid(Joi.ref('currentPassword'))
    .messages({ 'any.invalid': 'New password must be different from the current password' }),
})