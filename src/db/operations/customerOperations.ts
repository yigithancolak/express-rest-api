import { Types } from 'mongoose'
import { CustomerModel, ICustomer } from '../models/Customer'

interface PaginationOptions {
  limit?: number
  skip?: number
}

export const getCustomersByGroups = async (groupIds: Types.ObjectId[]) => {
  // Find all customers where groupIds field contains any value in the groupIds array
  const customers = await CustomerModel.find({ groupIds: { $in: groupIds } })
  return customers
}

export const getCustomersByOrganizationId = (
  organizationId: Types.ObjectId,
  { limit = 20, skip = 0 }: PaginationOptions
) => {
  return CustomerModel.find({ organizationId }).limit(limit).skip(skip).exec()
}

export const getCustomersByGroupId = (
  groupId: string,
  { limit = 10, skip = 0 }: PaginationOptions
) => {
  return CustomerModel.find({ groupIds: { $in: [groupId] } })
    .limit(limit)
    .skip(skip)
    .exec()
}

export const getCustomerById = (id: string) => {
  return CustomerModel.findOne({ _id: id })
}
export const createCustomer = (values: Partial<ICustomer>) =>
  new CustomerModel(values).save().then((customer) => customer.toObject())

export const deleteCustomerById = (id: string) =>
  CustomerModel.findOneAndDelete({ _id: id })

export const updateCustomerById = (id: string, values: Partial<ICustomer>) =>
  CustomerModel.findByIdAndUpdate(id, values, {
    new: true,
    runValidators: true
  })

export const getCustomerByPhoneNumber = (phoneNumber: string) => {
  return CustomerModel.findOne({ phoneNumber })
}
