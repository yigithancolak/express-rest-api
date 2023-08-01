import express from 'express'
import { handleGetAllUsers } from '../controller/usersController'
import { verifyJWT } from '../middleware/verifyJWT'

export default (router: express.Router) => {
  router.get('/users', verifyJWT, handleGetAllUsers)
}
