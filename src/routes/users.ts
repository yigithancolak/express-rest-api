import express from 'express'
import { handleGetAllUsers } from '../controller/usersController'
import { verifyRole } from '../middleware/verifyRole'

export default (router: express.Router) => {
  router.use('/users', verifyRole(['admin', 'organization']))
  router.get('/users', handleGetAllUsers)
}
