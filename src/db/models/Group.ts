import mongoose, { Types } from 'mongoose'

export interface IGroup {
  _id: Types.ObjectId
  name: string
  instructorId: Types.ObjectId // Linked to User
  day: string
  time: string
  customers: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructorId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  day: { type: String, required: true },
  time: {
    type: String,
    required: true,
    match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/ // Matches 'HH:MM' format
  },
  customers: [
    {
      type: Types.ObjectId,
      ref: 'Customer'
    }
  ],
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() }
})

export const GroupModel = mongoose.model<IGroup>('Group', groupSchema)
