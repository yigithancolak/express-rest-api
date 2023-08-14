import express from 'express'
import { verifyJWT } from '../middleware/verifyJWT'
import { handleCreateCustomer } from '../controller/customersController'

export default (router: express.Router) => {
  router.use('/customers', verifyJWT)
  // router.get('/customers', handleGetAllCustomers)
  router.post('/customers', handleCreateCustomer)
}
