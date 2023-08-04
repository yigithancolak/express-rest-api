import { Response } from 'express'
import {
  createUser,
  getUserByOrganizationId
} from '../db/operations/userOperations'
import { RequestWithUser } from '../types/requestTypes'

export const handleGetAllUsers = async (
  req: RequestWithUser,
  res: Response
) => {
  const { organizationId } = req.user
  try {
    const allUsers = await getUserByOrganizationId(organizationId)
    return res.status(200).json({ success: true, data: allUsers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const handleCreateUser = async (req: RequestWithUser, res: Response) => {
  const { organizationId } = req.user
  const { name, email, password, roles } = req.body

  try {
    const newUser = await createUser({
      name,
      email,
      authentication: { password },
      roles,
      organizationId
    })
    return res.status(201).json({ success: true, data: newUser })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
