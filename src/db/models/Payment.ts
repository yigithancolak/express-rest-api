import mongoose, { Types } from 'mongoose'

const paymentSchema = new mongoose.Schema({
  customerId: { type: Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  method: { type: String, enum: ['credit', 'debit', 'cash'], required: true }
  // Additional fields as needed
})

export const PaymentModel = mongoose.model('Payment', paymentSchema)
