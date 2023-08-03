import mongoose, { Types } from 'mongoose'
import { IAuthentication, authSchema } from './authSchema'

export type RolesType = 'instructor' | 'editor' | 'admin' | 'organization'

export interface IUser {
  _id: Types.ObjectId
  name: string
  email: string
  authentication: IAuthentication
  roles: RolesType[]
  organization: Types.ObjectId // Linked to Organization
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
    required: true
  },
  organization: {
    type: Types.ObjectId,
    ref: 'Organization' // Referring to the Organization model
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() }
})

export const UserModel = mongoose.model<IUser>('User', userSchema)

export interface IOrganization {
  _id: Types.ObjectId
  name: string
  email: string
  authentication: IAuthentication
  role: RolesType // Role for the organization
  createdAt: Date
  updatedAt: Date
}

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  authentication: authSchema,
  role: {
    type: String,
    enum: ['organization'],
    default: 'organization',
    required: true
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() }
})

export const OrganizationModel = mongoose.model<IOrganization>(
  'Organization',
  OrganizationSchema
)
