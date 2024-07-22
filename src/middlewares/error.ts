import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { HttpError } from '../utils/HttpError'
import { MSG } from '../helper/messages'
import Logger from '../utils/logger'
import { CONSTANTS } from '../helper/constants'
import { CustomError } from '../interfaces/common'

export const errorConverter = (
  err: CustomError,
  _: Request,
  __: Response,
  next: NextFunction
) => {
  if (!(err instanceof HttpError)) {
    const message = err.message || MSG.INTERNAL_SERVER_ERROR
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    err = new HttpError(message, statusCode, err.stack)
  }
  next(err)
}

export const errorHandler = (err: CustomError, _: Request, res: Response) => {
  const { message, statusCode } = err

  if (process.env.NODE_ENV === CONSTANTS.DEV) {
    Logger.error(err)
  }

  const response = {
    success: false,
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === CONSTANTS.DEV && { stack: err.stack }),
  }

  res.status(statusCode).json(response)
}
