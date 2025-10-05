import {
   DeleteObjectCommand,
   HeadObjectCommand,
   S3Client,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

import {
   AWS_S3_ACCESS_KEY_ID,
   AWS_S3_BUCKET_FOLDER,
   AWS_S3_BUCKET_NAME,
   AWS_S3_REGION,
   AWS_S3_SECRET_ACCESS_KEY,
   AWS_S3_URL,
} from './secrets'

const s3Client = new S3Client({
   region: AWS_S3_REGION,
   credentials: {
      accessKeyId: AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
   },
   endpoint: AWS_S3_URL,
})

const uploadFile = async (
   buffer: any,
   key: string,
): Promise<string | undefined> => {
   try {
      const upload = new Upload({
         client: s3Client,
         params: {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: AWS_S3_BUCKET_FOLDER + key,
            Body: buffer,
         },
      })

      const data = await upload.done()

      if (data.$metadata.httpStatusCode === 200) {
         return data.Location as string
      }
   } catch (error) {
      console.error('Error uploading file:', error)
   }
}

const deleteFile = async (location: string): Promise<void> => {
   try {
      if (location) {
         const key = location?.split(AWS_S3_BUCKET_FOLDER)[1]
         await s3Client.send(
            new DeleteObjectCommand({
               Bucket: AWS_S3_BUCKET_NAME,
               Key: AWS_S3_BUCKET_FOLDER + key,
            }),
         )
      }
   } catch (error) {
      console.error('Error deleting object:', error)
   }
}

const checkFileExists = async (location: string): Promise<boolean> => {
   try {
      if (location) {
         const key = location.split(AWS_S3_BUCKET_FOLDER)[1]
         await s3Client.send(
            new HeadObjectCommand({
               Bucket: AWS_S3_BUCKET_NAME,
               Key: AWS_S3_BUCKET_FOLDER + key,
            }),
         )
         return true
      }
      return false
   } catch (error: any) {
      if (error.name === 'NotFound') {
         return false
      }
      console.error('Error checking file existence:', error)
      throw error
   }
}

export { uploadFile, deleteFile, checkFileExists }
