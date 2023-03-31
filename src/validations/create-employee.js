import joi from 'joi'

export const CreateValidation = joi.object({
    name: joi.string().min(3).max(25).required(),
    email: joi.string().email().required(),
    phone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    role: joi.string().min(3).max(25).required(),
    isActive: joi.boolean().default(true),
});