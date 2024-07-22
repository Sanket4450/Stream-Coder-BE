import Joi from 'joi'

export const stringValidation = Joi.string().trim()
export const stringReqValidation = stringValidation.required()
export const emailValidation = stringReqValidation.email().lowercase()
export const passwordValidation = stringReqValidation.min(8)
export const numberValidation = Joi.number()
export const numberReqValidation = numberValidation.required()
export const integerNumberValidation = numberValidation.integer()
export const integerNumberReqValidation = integerNumberValidation.required()
export const booleanValidation = Joi.boolean()
export const dateValidation = Joi.date()
export const arrayValidation = Joi.array()
export const arrayReqValidation = arrayValidation.required()

export const pageAndLimit = {
  page: integerNumberValidation.min(1),
  limit: integerNumberValidation.min(1),
}

export const fileTypeValidation = stringReqValidation.valid('file', 'folder')
