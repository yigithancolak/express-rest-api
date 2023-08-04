import { Types } from 'mongoose'
import { CustomerModel } from '../models/Customer'

export const getCustomersByGroups = async (groupIds: Types.ObjectId[]) => {
  // Find all customers where groupIds field contains any value in the groupIds array
  const customers = await CustomerModel.find({ groupIds: { $in: groupIds } })
  return customers
}
