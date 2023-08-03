import mongoose, { Types } from 'mongoose'
import { IAuthentication, authSchema } from './authSchema'

export type RolesType = 'instructor' | 'editor' | 'admin' | 'organization'

export interface IUser {
  _id: Types.ObjectId
  name: string
  email: string
  authentication: IAuthentication
  roles: RolesType[]
  organizationId: Types.ObjectId // Linked to Organization
  groups?: Types.ObjectId[] // Linked to Group (for instructors)
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  authentication: authSchema,
  roles: {
    type: [String],
    enum: ['instructor', 'editor', 'admin', 'organization'],
    default: ['organization'],
    required: true
  },
  groups: [
    {
      type: Types.ObjectId,
      ref: 'Group'
    }
  ],
  organizationId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() }
})

export const UserModel = mongoose.model<IUser>('User', userSchema)
