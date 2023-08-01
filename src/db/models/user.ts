import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    accessToken: { type: String, select: false },
    refreshToken: { type: String, select: false }
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() }
})

export const UserModel = mongoose.model('User', UserSchema)
