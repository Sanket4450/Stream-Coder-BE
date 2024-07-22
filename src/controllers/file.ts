import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { errorWrapper } from '../utils/errorWrapper'
import { fileService } from '../services'
import { CreateFileDto } from '../interfaces/file'
import { sendResponse } from '../utils/sendResponse'
import { MSG } from '../helper/messages'

const createFile = errorWrapper(async (req: Request, res: Response) => {
  const body: CreateFileDto = req.body

  await fileService.createFile(body)

  return sendResponse(res, httpStatus.OK, MSG.FILE_CREATED)
})

const getFolderStructure = errorWrapper(async (req: Request, res: Response) => {
  const folderStructure = await fileService.getFolderStructure()

  return sendResponse(res, httpStatus.OK, MSG.FOLDER_STRUCTURE_FETCHED, folderStructure)
})

export default {
  createFile,
  getFolderStructure,
}
