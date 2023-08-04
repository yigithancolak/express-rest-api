import { Types } from 'mongoose'
import { CustomerModel, ICustomer } from '../models/Customer'

export const getCustomersByGroups = async (groupIds: Types.ObjectId[]) => {
  // Find all customers where groupIds field contains any value in the groupIds array
  const customers = await CustomerModel.find({ groupIds: { $in: groupIds } })
  return customers
}

export const getCustomers = (instructorId: Types.ObjectId) => {
  return CustomerModel.find({ instructorId: instructorId })
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

export const getGroupsByInstructor = (instructorId: Types.ObjectId) => {
  return CustomerModel.find({ instructorId: instructorId }).select('_id')
}
