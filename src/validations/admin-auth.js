import joi from 'joi'

export const AdminAuthValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });