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

export default (router: express.Router) => {
  router.use(
    '/groups',
    verifyJWT,
    verifyRole(['admin', 'editor', 'organization'])
  )
  router.get('/groups', handleGetGroupsOfOrganization)
  router.post('/groups', handleCreateGroup)

  router.get('/groups/:id', verifyGroupOwnership, handleGetOneGroup)
  router.patch('/groups/:id', verifyGroupOwnership, handleUpdateGroup)
  router.delete('/groups/:id', verifyGroupOwnership, handleDeleteGroup)
}
