import { authRouter } from './auth/auth.route'
import { uploadRouter } from './upload/upload.route'
import { userRouter } from './user/user.route'

export const Routes = [
   { path: '/upload', router: uploadRouter },
   { path: '/auth', router: authRouter },
   { path: '/user', router: userRouter },
]
