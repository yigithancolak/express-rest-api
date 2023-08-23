import { Response } from 'express'
import { RequestWithUser } from '../types/requestTypes'
import {
  createPayment,
  getPaymentById,
  getPaymentsByOrganization
} from '../db/operations/paymentOperations'
import { IPayment } from '../db/models/Payment'

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

  try {
    const allPayments = await getPaymentsByOrganization(organizationId)
    res.status(200).json({ success: true, data: allPayments })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
