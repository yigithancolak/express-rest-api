import express from 'express'
import {
  handleLoginUser,
  handleRegisterUser
} from '../controller/authController'
import { handleLogout } from '../controller/logoutController'

export default (router: express.Router) => {
  router.post('/auth/register', handleRegisterUser)
  router.post('/auth/login', handleLoginUser)
  router.post('/auth/logout', handleLogout)
}
