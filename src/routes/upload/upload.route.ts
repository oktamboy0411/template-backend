import { Router } from "express"

import { UploadController } from "../../controllers/upload"
import { upload } from "../../utils"

export const uploadRouter = Router()

uploadRouter.post("/file", upload.single("file"), UploadController.uploadFile)
uploadRouter.post(
   "/files",
   upload.array("files", 10),
   UploadController.uploadFiles,
)
