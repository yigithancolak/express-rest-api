import express from 'express'
import { handleRefreshToken } from '../controller/refreshTokenController'

export default (router: express.Router) => {
  router.get('/refresh', handleRefreshToken)
}
