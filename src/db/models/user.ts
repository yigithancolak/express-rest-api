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
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    authentication: authSchema,
    roles: {
      type: [String],
      enum: ['instructor', 'editor', 'admin', 'organization'],
      default: ['organization'],
      required: true
    },
    organizationId: {
      type: Types.ObjectId,
      ref: 'User',
      default: function () {
        const schema = this as IUser
        return schema._id
      }
    }
  },
  {
    timestamps: true
  }
)

export const UserModel = mongoose.model<IUser>('User', userSchema)
