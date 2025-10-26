import { Router } from 'express'

import { UploadController } from '../../controllers'
import { authMiddleware, upload } from '../../utils'

const uploadRouter = Router()

uploadRouter.post(
   '/file',
   authMiddleware,
   upload.single('file'),
   UploadController.uploadFile,
)

uploadRouter.post(
   '/files',
   authMiddleware,
   upload.array('files', 10),
   UploadController.uploadFiles,
)

export { uploadRouter }
