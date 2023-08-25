import { Types } from 'mongoose'
import { IPayment, PaymentModel } from '../models/Payment'

export interface PaymentFilters {
  organizationId: Types.ObjectId
  startDate?: Date
  endDate?: Date
  customerId?: Types.ObjectId
  groupId?: Types.ObjectId
}

export type FilterCriteria = Omit<PaymentFilters, 'startDate' | 'endDate'> & {
  createdAt?: {
    $gte?: Date
    $lte?: Date
  }
}

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

export const getPaymentsByOrganization = (filters: PaymentFilters) => {
  const query = { organizationId: filters.organizationId } as FilterCriteria

  if (filters.groupId) {
    query.groupId = filters.groupId
  }

  if (filters.customerId) {
    query.customerId = filters.customerId
  }

  if (filters.startDate && filters.endDate) {
    query.createdAt = {
      $gte: filters.startDate,
      $lte: filters.endDate
    }
  }
  console.log('query: ', query)

  return PaymentModel.find(query).populate('customerId').exec()
}

export const getPaymentsByGroup = (groupId: Types.ObjectId) => {
  return (
    PaymentModel.find({ groupId })
      .populate('customerId')
      // .populate('organizationId')
      .exec()
  )
}
