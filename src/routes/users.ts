import express from 'express'
import {
  handleCreateUserForOrganization,
  handleGetAllUsers
} from '../controller/usersController'
import { verifyJWT } from '../middleware/verifyJWT'
import { verifyRole } from '../middleware/verifyRole'

export default (router: express.Router) => {
  const usersRouter = express.Router()

  usersRouter.use(verifyJWT)
  usersRouter.use(verifyRole(['admin', 'organization']))

  usersRouter.get('/', handleGetAllUsers)
  usersRouter.post('/', handleCreateUserForOrganization)

  router.use('/users', usersRouter)
}
