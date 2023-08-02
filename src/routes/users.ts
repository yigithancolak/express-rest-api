import express from 'express'
import { handleGetAllUsers } from '../controller/usersController'
import { verifyJWT } from '../middleware/verifyJWT'
import { verifyRole } from '../middleware/verifyRole'

export default (router: express.Router) => {
  router.get('/users', verifyJWT, verifyRole('user'), handleGetAllUsers)
}
