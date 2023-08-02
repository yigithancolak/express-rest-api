// const tokenPayload = { id: user._id, role: user.role }; // Customize based on your needs

import { Types } from 'mongoose'
import { IUser } from '../db/models/User'

export type UserJWT = {
  id: Types.ObjectId
  role: string
}

export const createTokenPayload = (user: IUser): UserJWT => {
  return {
    id: user._id,
    role: user.role // Assuming role is defined in your IUser interface
  }
}

export default createTokenPayload
