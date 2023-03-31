import joi from 'joi'

export const ActivityStatusValidation = joi.object({
    is_active: joi.boolean().required()
  });