import { Response } from 'express'
import { Types } from 'mongoose'
import { IPayment } from '../db/models/Payment'
import {
  PaymentFilters,
  createPayment,
  getPaymentsByOrganization
} from '../db/operations/paymentOperations'
import { RequestWithUser } from '../types/requestTypes'

export const handleCreatePayments = async (
  req: RequestWithUser,
  res: Response
) => {
  const { amount, method, groupId, customerId } = req.body as Partial<IPayment>
  const { organizationId } = req.user

  if (!amount || !method || !groupId || !customerId)
    return res
      .status(400)
      .json({ success: false, message: 'All fields must be provided' })

  try {
    const newPayment = await createPayment({
      amount,
      method,
      groupId,
      customerId,
      organizationId
    })
    res.status(201).json({ success: true, data: newPayment })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const handleGetPaymentsOfOrganization = async (
  req: RequestWithUser,
  res: Response
) => {
  const { organizationId } = req.user
  const { groupId, customerId, startDate, endDate } = req.query

  // Convert query params into PaymentFilters type
  const filters: PaymentFilters = {
    organizationId,
    groupId: groupId ? new Types.ObjectId(groupId as string) : undefined,
    customerId: customerId
      ? new Types.ObjectId(customerId as string)
      : undefined
  }

  if (startDate) {
    filters.startDate = new Date(startDate as string)
  }

  if (endDate) {
    filters.endDate = new Date(endDate as string)
  }

  try {
    const allPayments = await getPaymentsByOrganization(filters)
    res.status(200).json({ success: true, data: allPayments })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
