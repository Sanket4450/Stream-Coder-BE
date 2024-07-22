import { Response } from 'express'
import { CONSTANTS } from '../helper/constants'

export const sendResponse = (
  res: Response,
  status: number,
  message?: string,
  data = {}
) => {
  return res.status(status).json({
    success: true,
    code: status,
    message: message || CONSTANTS.OK,
    results: data,
  })
}
