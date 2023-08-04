import { Response } from 'express'
import { IGroup } from '../db/models/Group'
import {
  createGroup,
  deleteGroupById,
  getGroupById,
  getGroupsOfOrganization,
  updateGroupById
} from '../db/operations/groupOperations'
import { RequestWithFoundGroup, RequestWithUser } from '../types/requestTypes'

export const handleCreateGroup = async (
  req: RequestWithUser,
  res: Response
) => {
  const { name, day, time } = req.body
  const { organizationId } = req.user

  if (!name || !day || !time)
    return res
      .status(400)
      .json({ success: false, message: 'Name, day and time required' })

  try {
    const newGroup = await createGroup({
      name,
      day,
      time,
      organizationId
    })
    res.status(201).json({ success: true, data: newGroup })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const handleGetGroupsOfOrganization = async (
  req: RequestWithUser,
  res: Response
) => {
  const { organizationId } = req.user

  try {
    const allGroups = await getGroupsOfOrganization(organizationId)
    return res.status(200).json({ success: true, data: allGroups })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const handleGetOneGroup = async (
  req: RequestWithFoundGroup,
  res: Response
) => {
  const { id } = req.params
  if (!id)
    return res
      .status(400)
      .json({ success: true, message: 'Id must be provided' })

  return res.status(200).json({ success: true, data: req.foundGroup })
}

export const handleUpdateGroup = async (
  req: RequestWithUser,
  res: Response
) => {
  const { id } = req.params
  const updatedFields = req.body as Partial<IGroup>
  if (!id)
    return res
      .status(400)
      .json({ success: true, message: 'Id must be provided' })

  try {
    const updatedGroup = await updateGroupById(id, updatedFields)

    return res.status(200).json({ success: true, data: updatedGroup })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const handleDeleteGroup = async (
  req: RequestWithUser,
  res: Response
) => {
  const { id } = req.params
  const updatedFields = req.body as Partial<IGroup>
  if (!id)
    return res
      .status(400)
      .json({ success: true, message: 'Id must be provided' })

  try {
    const foundGroup = await getGroupById(id)

    if (!foundGroup)
      return res
        .status(404)
        .json({ success: false, message: 'Group has not found' })

    const deletedGroup = await deleteGroupById(id)

    return res
      .status(200)
      .json({ success: true, message: 'Group has been deleted' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
