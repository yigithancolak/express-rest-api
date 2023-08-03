import mongoose, { Types } from 'mongoose'

export interface ICustomer {
  _id: Types.ObjectId
  name: string
  email: string
  phoneNumber: string // Phone number
  groupIds: Types.ObjectId[] // Linked to multiple Groups
  createdAt: Date
  updatedAt: Date
}

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String },
  groupIds: [
    {
      type: Types.ObjectId,
      ref: 'Group',
      required: true
    }
  ],
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() }
})

export const CustomerModel = mongoose.model<ICustomer>(
  'Customer',
  customerSchema
)
