import mongoose, { Types } from 'mongoose'

export interface IGroup {
  _id: Types.ObjectId
  name: string
  instructorId: Types.ObjectId // Linked to User
  organizationId: Types.ObjectId
  day: string
  time: string
  createdAt: Date
  updatedAt: Date
}

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instructorId: {
      type: Types.ObjectId,
      ref: 'User'
    },
    organizationId: {
      type: Types.ObjectId,
      ref: 'User'
    },
    day: {
      type: String,
      enum: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ],
      required: true
    },
    time: {
      type: String,
      required: true,
      match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/ // Matches 'HH:MM' format
    }
  },
  { timestamps: true }
)

export const GroupModel = mongoose.model<IGroup>('Group', groupSchema)
