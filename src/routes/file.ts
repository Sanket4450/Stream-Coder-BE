import express from 'express'
import { validate } from '../middlewares/validate'
import { createFile } from '../validations'
import { fileController } from '../controllers'

const router = express.Router()

router.post('/', validate(createFile), fileController.createFile)

router.get('/', fileController.getFolderStructure)

export default router
