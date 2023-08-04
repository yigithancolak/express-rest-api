import mongoose, { Types } from 'mongoose'

export interface ICustomer {
  _id: Types.ObjectId
  name: string
  email: string
  phoneNumber: string // Phone number
  groupIds: Types.ObjectId[] // Linked to multiple Groups
  organizationId: Types.ObjectId
  lastPayment: Date
  nextPayment: Date
  createdAt: Date
  updatedAt: Date
}

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String },
    phoneNumber: { type: String },
    groupIds: [
      {
        type: Types.ObjectId,
        ref: 'Group',
        required: [true, 'Group is required']
      }
    ],
    organizationId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true
    },
    lastPayment: { type: Date, required: [true, 'Last payment is required.'] },
    nextPayment: { type: Date, required: [true, 'Next payment is required.'] }
  },
  {
    timestamps: true
  }
)

export const CustomerModel = mongoose.model<ICustomer>(
  'Customer',
  customerSchema
)
