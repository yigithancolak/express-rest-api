import express from 'express'
import {
  handleCreatePayments,
  handleGetPaymentsOfOrganization
} from '../controller/paymentsController'
import { verifyJWT } from '../middleware/verifyJWT'
import { verifyRole } from '../middleware/verifyRole'

export default (router: express.Router) => {
  const paymentsRouter = express.Router()
  paymentsRouter.use(verifyJWT, verifyRole(['admin', 'organization', 'editor']))

  paymentsRouter.get('/', handleGetPaymentsOfOrganization)
  paymentsRouter.post('/', handleCreatePayments)

  // Attach the paymentsRouter to the main router
  router.use('/payments', paymentsRouter)
}
