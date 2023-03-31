import joi from 'joi'

export const CreateValidation = joi.object({
    name: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    phone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    role: joi.string().alphanum().min(3).max(25).trim(true).required(),
    isActive: joi.boolean().default(true),
});