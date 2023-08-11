import express from 'express'
import {
  handleCreateUserForOrganization,
  handleGetAllUsers
} from '../controller/usersController'
import { verifyJWT } from '../middleware/verifyJWT'
import { verifyRole } from '../middleware/verifyRole'

export default (router: express.Router) => {
  router.use('/users', verifyJWT)
  router.use('/users', verifyRole(['admin', 'organization']))
  router.get('/users', handleGetAllUsers)
  router.post('/users', handleCreateUserForOrganization)
}
