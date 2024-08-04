import express from 'express'
import { validate } from '../middlewares/validate'
import { fileValidation } from '../validations'
import { fileController } from '../controllers'

const router = express.Router()

router.get('/', fileController.getFolderStructure)

router.post('/', validate(fileValidation.createFile), fileController.createFile)

router.put('/', validate(fileValidation.updateFile), fileController.updateFile)

router.delete(
  '/',
  validate(fileValidation.deleteFile),
  fileController.deleteFile
)

router.get('/:file_id', validate(fileValidation.getFileContent), fileController.getFileContent)

export default router
