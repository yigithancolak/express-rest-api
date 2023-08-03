import { Types } from 'mongoose'
import { GroupModel } from '../models/Group'

export const getGroups = (instructorId: Types.ObjectId) => {
  return GroupModel.find({ instructorId: instructorId })
}

export const getGroupById = (id: string) => {
  return GroupModel.findOne({ _id: id })
}
export const createGroup = (values: Record<string, any>) =>
  new GroupModel(values).save().then((group) => group.toObject())

export const deleteUserById = (id: string) =>
  GroupModel.findOneAndDelete({ _id: id })

export const updateGroupById = (id: string, values: Record<string, any>) =>
  GroupModel.findByIdAndUpdate(id, values)

export const getGroupsByInstructor = (instructorId: Types.ObjectId) => {
  return GroupModel.find({ instructorId: instructorId }).select('_id')
}
