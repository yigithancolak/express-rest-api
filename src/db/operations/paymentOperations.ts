import { Types } from 'mongoose'
import { IPayment, PaymentModel } from '../models/Payment'

export const getPaymentById = (id: string) => {
  return (
    PaymentModel.findOne({ _id: id })
      .populate('customerId')
      // .populate('organizationId')
      // .populate('groupId')
      .exec()
  )
}

export const createPayment = (values: Partial<IPayment>) =>
  new PaymentModel(values).save().then((payment) => payment.toObject())

export const deletePaymentById = (id: string) =>
  PaymentModel.findOneAndDelete({ _id: id })

export const updatePaymentById = (id: string, values: Record<string, any>) =>
  PaymentModel.findByIdAndUpdate(id, values, { new: true, runValidators: true })

export const getPaymentsByCustomer = (customerId: Types.ObjectId) => {
  return (
    PaymentModel.find({ customerId })
      .populate('customerId')
      // .populate('organizationId')
      // .populate('groupId')
      .exec()
  )
}

export const getPaymentsByOrganization = (organizationId: Types.ObjectId) => {
  return (
    PaymentModel.find({ organizationId })
      .populate('customerId')
      // .populate('customerId')
      // .populate('groupId')
      .exec()
  )
}

export const getPaymentsByGroup = (groupId: Types.ObjectId) => {
  return (
    PaymentModel.find({ groupId })
      .populate('customerId')
      // .populate('customerId')
      // .populate('organizationId')
      .exec()
  )
}
