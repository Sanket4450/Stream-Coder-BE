import Joi from 'joi'
import {
  fileTypeValidation,
  integerNumberValidation,
  stringReqValidation,
} from './common'

export const createFile = {
  body: Joi.object({
    type: fileTypeValidation,
    name: stringReqValidation,
    parent_folder_id: integerNumberValidation,
  }),
}
