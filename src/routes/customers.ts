import express from 'express'
import { verifyJWT } from '../middleware/verifyJWT'
import {
  handleCreateCustomer,
  handleDeleteCustomer,
  handleGetOneCustomer,
  handleUpdateCustomer
} from '../controller/customersController'
import { verifyCustomerOwnership } from '../middleware/verifyCustomerOwnership'

export default (router: express.Router) => {
  const customerRouter = express.Router()

  // Apply common middleware for all customer routes
  customerRouter.use(verifyJWT)

  // customerRouter.get('/', handleGetAllCustomers);
  customerRouter.post('/', handleCreateCustomer)

  customerRouter.use('/:id', verifyCustomerOwnership)
  customerRouter.get('/:id', handleGetOneCustomer)
  customerRouter.patch('/:id', handleUpdateCustomer)
  customerRouter.delete('/:id', handleDeleteCustomer)

  router.use('/customers', customerRouter)
}
