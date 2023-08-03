import mongoose from 'mongoose'

export interface IAuthentication {
  password: string
  accessToken?: string
  refreshToken?: string
}

export const authSchema = new mongoose.Schema(
  {
    password: { type: String, required: true, select: false },
    accessToken: { type: String, select: false },
    refreshToken: { type: String, select: false }
  },
  { _id: false }
) // This line ensures that the schema doesn't create an additional _id field
