import Joi from 'joi'
import {
  fileTypeValidation,
  primaryKeyReqValidation,
  primaryKeyValidation,
  stringReqValidation,
  stringValidation,
} from './common'

const createFile = {
  body: Joi.object({
    type: fileTypeValidation,
    name: stringReqValidation,
    parent_folder_id: primaryKeyValidation,
  }),
}

const updateFile = {
  params: Joi.object({
    id: primaryKeyReqValidation,
  }),
  body: Joi.object({
    name: stringValidation,
  }),
}

const deleteFile = {
  body: Joi.object({
    id: primaryKeyReqValidation,
  }),
}

export default { createFile, updateFile, deleteFile }