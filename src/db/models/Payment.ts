import mongoose, { Types } from 'mongoose'

export interface IPayment {
  _id: Types.ObjectId
  customerId: Types.ObjectId
  organizationId: Types.ObjectId
  groupId: Types.ObjectId
  amount: number
  method: 'credit' | 'debit' | 'cash'
  createdAt: Date
  updatedAt: Date
}

const paymentSchema = new mongoose.Schema(
  {
    customerId: { type: Types.ObjectId, ref: 'Customer', required: true },
    organizationId: { type: Types.ObjectId, ref: 'User', required: true },
    groupId: { type: Types.ObjectId, ref: 'Group', required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['credit', 'debit', 'cash'], required: true }
  },
  {
    timestamps: true
  }
)

export const PaymentModel = mongoose.model<IPayment>('Payment', paymentSchema)
