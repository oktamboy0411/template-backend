const UploadSwagger = {
   endpoint: 'upload',
   paths: [
      {
         path: 'file',
         body: {
            post: {
               consumes: ['multipart/form-data'],
               tags: ['Upload'],
               requestBody: {
                  content: {
                     'multipart/form-data': {
                        schema: {
                           type: 'object',
                           properties: {
                              file: {
                                 type: 'string',
                                 format: 'binary',
                              },
                           },
                        },
                     },
                  },
               },
               responses: {},
            },
         },
      },
   ],
}

export default UploadSwagger
