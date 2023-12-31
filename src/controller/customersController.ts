import { Response } from 'express'
import {
  RequestWithFoundCustomer,
  RequestWithFoundGroup,
  RequestWithUser
} from '../types/requestTypes'
import {
  createCustomer,
  getCustomerByPhoneNumber,
  getCustomersByGroupId,
  updateCustomerById
} from '../db/operations/customerOperations'
import { ICustomer } from '../db/models/Customer'

export const handleGetCustomersForGroup = async (
  req: RequestWithFoundGroup,
  res: Response
) => {
  const { id } = req.params

  if (!id)
    return res
      .status(400)
      .json({ success: true, message: 'Id must be provided' })

  let page

  if (req.query.page) {
    page = parseInt(req.query.page as string)
  }

  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit

  const foundCustomers = await getCustomersByGroupId(id, { skip, limit })

  return res.status(200).json({ success: true, data: foundCustomers })
}

export const handleCreateCustomer = async (
  req: RequestWithUser,
  res: Response
) => {
  const organizationId = req.user.organizationId
  const { name, email, groupIds, lastPayment, nextPayment, phoneNumber } =
    req.body as Partial<ICustomer>

  if (!name || !phoneNumber)
    return res
      .status(400)
      .json({ success: false, message: 'Name and phone number are required' })

  const foundCustomer = await getCustomerByPhoneNumber(phoneNumber)

  if (foundCustomer)
    return res.status(400).json({
      success: false,
      message: 'User with that phone number already exists'
    })

  //todo: Add group exists check

  const newCustomer = await createCustomer({
    name,
    email,
    groupIds,
    lastPayment,
    nextPayment,
    phoneNumber,
    organizationId
  })

  return res.status(201).json({ success: true, data: newCustomer })
}

export const handleGetOneCustomer = (
  req: RequestWithFoundCustomer,
  res: Response
) => {
  return res.status(200).json({ success: true, data: req.foundCustomer })
}

export const handleDeleteCustomer = (
  req: RequestWithFoundCustomer,
  res: Response
) => {
  return res.status(200).json({
    success: true,
    message: `Group with _id:${req.foundCustomer._id}, has been deleted`
  })
}

export const handleUpdateCustomer = async (
  req: RequestWithFoundCustomer,
  res: Response
) => {
  const updatedValues = req.body as Partial<ICustomer>
  const customerId = req.foundCustomer._id
  const updatedCustomer = await updateCustomerById(
    customerId.toString(),
    updatedValues
  )
  return res.status(200).json({ success: true, data: updatedCustomer })
}
