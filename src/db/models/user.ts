import mongoose, { Types } from 'mongoose'

export type RolesType = 'user' | 'admin'

export interface IUser {
  _id: Types.ObjectId
  username: string
  email: string
  authentication?: {
    password?: string
    accessToken?: string
    refreshToken?: string
  }
  role: RolesType
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    accessToken: { type: String, select: false },
    refreshToken: { type: String, select: false }
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() }
})

export const UserModel = mongoose.model('User', UserSchema)
