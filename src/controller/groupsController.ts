import { Response } from 'express'
import mongoose from 'mongoose'
import { createGroup, getGroups } from '../db/operations/groupOperations'
import { RequestWithUser } from '../middleware/verifyJWT'

export const handleCreateGroup = async (
  req: RequestWithUser,
  res: Response
) => {
  const { name, day, time } = req.body
  const { id } = req.user

  if (!name || !day || !time)
    return res
      .status(400)
      .json({ success: false, message: 'Name, day and time required' })

  try {
    const newGroup = await createGroup({ name, day, time, instructorId: id })
    res.status(201).json({ success: true, data: newGroup })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ success: false, message: 'Invalid input' })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}

export const handleGetAllGroups = async (
  req: RequestWithUser,
  res: Response
) => {
  const { id } = req.user
  try {
    const allGroups = await getGroups(id)
    return res.status(200).json({ success: true, data: allGroups })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
