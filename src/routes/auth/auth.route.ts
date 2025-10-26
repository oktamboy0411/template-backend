import { Router } from 'express'

import { AuthController } from '../../controllers'
import { authMiddleware } from '../../utils'
import { AuthValidator, validate } from '../../validators'

const authRouter = Router()

authRouter.post('/login', AuthValidator.login(), validate, AuthController.login)

authRouter.post(
   '/sign-up/ceo',
   AuthValidator.signUpCeo(),
   validate,
   AuthController.signUpCeo,
)

authRouter.get('/me', authMiddleware, AuthController.getMe)

authRouter.patch(
   '/update-me',
   authMiddleware,
   AuthValidator.updateMe(),
   validate,
   AuthController.updateMe,
)

authRouter.patch(
   '/update-password',
   authMiddleware,
   AuthValidator.updatePassword(),
   validate,
   AuthController.updatePassword,
)

export { authRouter }
