import express from 'express'
import {
  handleCreateGroup,
  handleDeleteGroup,
  handleGetGroupsOfOrganization,
  handleGetOneGroup,
  handleUpdateGroup
} from '../controller/groupsController'
import { verifyGroupOwnership } from '../middleware/verifyGroupOwnership'
import { verifyJWT } from '../middleware/verifyJWT'
import { verifyRole } from '../middleware/verifyRole'
import { handleGetCustomersForGroup } from '../controller/customersController'

export default (router: express.Router) => {
  const groupRouter = express.Router()

  // Apply common middleware for all group routes
  groupRouter.use(verifyJWT, verifyRole(['admin', 'editor', 'organization']))

  groupRouter.get('/', handleGetGroupsOfOrganization)
  groupRouter.post('/', handleCreateGroup)

  groupRouter.use('/:id', verifyGroupOwnership)
  groupRouter.get('/:id', handleGetOneGroup)
  groupRouter.patch('/:id', handleUpdateGroup)
  groupRouter.delete('/:id', handleDeleteGroup)

  groupRouter.get('/:id/customers', handleGetCustomersForGroup)

  // Attach the groupRouter to the main router
  router.use('/groups', groupRouter)
}
