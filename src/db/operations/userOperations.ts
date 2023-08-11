import { Types } from 'mongoose'
import { IUser, UserModel } from '../models/User'

export const getUsers = () => UserModel.find()

export const getUserByEmail = (email: string) => UserModel.findOne({ email })

export const getUserByRefreshToken = (refreshToken: string) =>
  UserModel.findOne({ 'authentication.refreshToken': refreshToken })

export const getUsersByOrganizationId = (organizationId: Types.ObjectId) =>
  UserModel.find({ organizationId }).exec()

export const getFilteredUsersByRole = (
  organizationId: Types.ObjectId,
  role: string
) => {
  return UserModel.find({
    organizationId,
    roles: { $in: [role] }
  }).exec()
} //need test

export const getUserById = (id: Types.ObjectId) => {
  return UserModel.findOne({ _id: id })
}

export const createUser = (values: Partial<IUser>) =>
  new UserModel(values).save().then((user) => user.toObject())

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id })

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values)
