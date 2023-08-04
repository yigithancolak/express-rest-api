import express from 'express'
import {
  handleCreateGroup,
  handleGetAllGroups
} from '../controller/groupsController'
import { verifyRole } from '../middleware/verifyRole'

export default (router: express.Router) => {
  router.use('/groups', verifyRole(['admin', 'editor', 'organization']))
  router.get('/groups', handleGetAllGroups)
  router.post('/groups', handleCreateGroup)
}
