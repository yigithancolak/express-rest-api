import { Types } from 'mongoose'
import { GroupModel, IGroup } from '../models/Group'

// export const getGroups = (instructorId: Types.ObjectId) => {
//   return GroupModel.find({ instructorId: instructorId })
// }

export const getGroupById = (id: string) => {
  return GroupModel.findOne({ _id: id })
}
export const createGroup = (values: Partial<IGroup>) =>
  new GroupModel(values).save().then((group) => group.toObject())

export const deleteGroupById = (id: string) =>
  GroupModel.findOneAndDelete({ _id: id })

export const updateGroupById = (id: string, values: Record<string, any>) =>
  GroupModel.findByIdAndUpdate(id, values, { new: true, runValidators: true })

export const getGroupsOfInstructor = (instructorId: Types.ObjectId) => {
  return GroupModel.find({ instructorId })
}

export const getGroupsOfOrganization = (organizationId: Types.ObjectId) => {
  return GroupModel.find({ organizationId })
}
