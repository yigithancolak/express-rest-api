import express from 'express'
import {
  handleLoginUser,
  handleRegisterUser
} from '../controller/authController'
import { handleLogout } from '../controller/logoutController'

export default (router: express.Router) => {
  const authRouter = express.Router()

  authRouter.post('/register', handleRegisterUser)
  authRouter.post('/login', handleLoginUser)
  authRouter.post('/logout', handleLogout)

  // Attach the authRouter to the main router
  router.use('/auth', authRouter)
}
