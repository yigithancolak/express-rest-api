import { NextFunction, Response } from 'express'
import {
  RequestWithFoundCustomer,
  RequestWithUser
} from '../types/requestTypes'
import { getCustomerById } from '../db/operations/customerOperations'

export const verifyCustomerOwnership = async (
  req: RequestWithFoundCustomer,
  res: Response,
  next: NextFunction
) => {
  const { organizationId } = req.user
  const customerId = req.params.id

  if (!customerId)
    return res
      .status(400)
      .json({ success: false, message: 'Id parameter is required in url' })

  try {
    const foundCustomer = await getCustomerById(customerId)

    if (!foundCustomer)
      return res
        .status(404)
        .json({ success: false, message: 'Customer has not found' })

    if (foundCustomer.organizationId.toString() !== organizationId.toString())
      return res.status(400).json({
        success: false,
        message: 'Not permitted for accessing that Customer'
      })

    req.foundCustomer = foundCustomer
    next()
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
