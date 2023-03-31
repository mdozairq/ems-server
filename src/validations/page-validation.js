import joi from 'joi'

export const PaginationValidation = joi.object({
    page_size: joi.number().min(1).max(100).required(),
    page: joi.number().min(0).required(),
  });