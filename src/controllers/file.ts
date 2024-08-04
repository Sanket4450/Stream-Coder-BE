import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { errorWrapper } from '../utils/errorWrapper'
import { FileService } from '../services'
import { CreateFileDto, DeleteFileDto, UpdateFileDto } from '../interfaces'
import { sendResponse } from '../utils/sendResponse'
import { MSG } from '../helper/messages'

const fileService = new FileService()

const getFolderStructure = errorWrapper(async (_: Request, res: Response) => {
  const folderStructure = await fileService.getFolderStructure()

  return sendResponse(
    res,
    httpStatus.OK,
    MSG.FOLDER_STRUCTURE_FETCHED,
    folderStructure
  )
})

const createFile = errorWrapper(async (req: Request, res: Response) => {
  const body: CreateFileDto = req.body

  await fileService.createFile(body)

  return sendResponse(res, httpStatus.OK, MSG.FILE_CREATED)
})

const updateFile = errorWrapper(async (req: Request, res: Response) => {
  const body: UpdateFileDto = req.body

  await fileService.updateFile(parseInt(req.params.id), body)

  return sendResponse(res, httpStatus.OK, MSG.FILE_UPDATED)
})

const deleteFile = errorWrapper(async (req: Request, res: Response) => {
  const body: DeleteFileDto = req.body

  await fileService.deleteFile(body)

  return sendResponse(res, httpStatus.OK, MSG.FILE_DELETED)
})

const getFileContent = errorWrapper(async (req: Request, res: Response) => {
  const { file_id } = req.params

  const file = await fileService.getFileContent(Number(file_id))

  return sendResponse(res, httpStatus.OK, MSG.FILE_CONTENT_FETCHED, file)
})

export default {
  getFolderStructure,
  createFile,
  updateFile,
  deleteFile,
  getFileContent,
}
