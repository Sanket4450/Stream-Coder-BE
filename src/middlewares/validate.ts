import Joi from 'joi'
import httpStatus from 'http-status'
import { pick } from '../utils/pick'
import { HttpError } from '../utils/HttpError'
import { NextFunction, Request, Response } from 'express'

interface Schema {
  query?: Joi.ObjectSchema<any>
  params?: Joi.ObjectSchema<any>
  body?: Joi.ObjectSchema<any>
}

const schemaOptions = {
  errors: {
    wrap: {
      label: '',
    },
  },
}

export const validate =
  (schema: Schema) => (req: Request, _: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['query', 'params', 'body'])
    const object = pick(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object, schemaOptions)

    if (error) {
      const errorMessage = error.details[0].message
      return next(new HttpError(errorMessage, httpStatus.BAD_REQUEST))
    }
    Object.assign(req, value)
    return next()
  }
