import express from 'express'
import authentication from './auth'
import groups from './groups'
import refresh from './refresh'
import users from './users'

const router = express.Router()

export default (): express.Router => {
  authentication(router)
  refresh(router)

  users(router)
  groups(router)

  return router
}
