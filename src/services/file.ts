import httpStatus from 'http-status'
import { MSG } from '../helper/messages'
import { HttpError } from '../utils/HttpError'
import { CreateFileDto } from '../interfaces/file'
import { FileRepository } from '../repositories'

const fileRepository = new FileRepository()

const createFile = async (body: CreateFileDto) => {
  try {
    if (body.parent_folder_id) {
      if (!(await fileRepository.findById(body.parent_folder_id))) {
        throw new HttpError(MSG.FOLDER_NOT_FOUND, httpStatus.NOT_FOUND)
      }
    }

    return fileRepository.insert(body)
  } catch (error) {
    throw new HttpError(
      error.message || MSG.INTERNAL_SERVER_ERROR,
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    )
  }
}

const getFolderStructure = async () => {
  try {
    return fileRepository.find({}, { type: true, name: true })
  } catch (error) {
    throw new HttpError(
      error.message || MSG.INTERNAL_SERVER_ERROR,
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    )
  }
}

export default {
  createFile,
  getFolderStructure,
}
