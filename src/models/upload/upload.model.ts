import { Schema, model } from "mongoose"

import { CollectionConstants } from "../../constants"
import { CollectionConstantsType } from "../../types"

interface DocumentI {
   user: object
   file_path: string
   is_use: boolean
   where_used: CollectionConstantsType
   created_at: Date
}

const documentSchema = new Schema<DocumentI>(
   {
      user: { type: Object },
      file_path: { type: String, required: true },
      is_use: { type: Boolean, required: true, default: false },
      where_used: {
         type: String,
         enum: Object.values(CollectionConstants),
      },
      created_at: { type: Date, default: Date.now },
   },
   { versionKey: false },
)

export const SaveFileModel = model<DocumentI>(
   CollectionConstants.UPLOAD,
   documentSchema,
   CollectionConstants.UPLOAD,
)
