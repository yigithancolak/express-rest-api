import { Types } from 'mongoose'
import { UserModel } from '../models/User'

export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getSessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessionToken': sessionToken
  })
export const getUserById = (id: Types.ObjectId) => {
  return UserModel.findOne({ _id: id })
}
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject())
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values)
