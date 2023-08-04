import express from 'express'
import {
  handleCreateCustomer,
  handleGetCustomers
} from '../controller/customersController'
import { verifyJWT } from '../middleware/verifyJWT'

export default (router: express.Router) => {
  router.use('/customers', verifyJWT)
  router.get('/customers', handleGetCustomers)
  router.post('/customers', handleCreateCustomer)
}
