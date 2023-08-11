import { Response } from 'express'
import {
  createUser,
  getFilteredUsersByRole,
  getUserByEmail,
  getUsersByOrganizationId
} from '../db/operations/userOperations'
import { RequestWithUser } from '../types/requestTypes'
import { hashPassword } from '../helpers/passwordHelpers'

export const handleGetAllUsers = async (
  req: RequestWithUser,
  res: Response
) => {
  const { organizationId } = req.user
  const roleFilter = req.query.role as string

  if (roleFilter) {
    try {
      const allUsers = await getFilteredUsersByRole(organizationId, roleFilter)
      return res.status(200).json({ success: true, data: allUsers })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  try {
    const allUsers = await getUsersByOrganizationId(organizationId)
    return res.status(200).json({ success: true, data: allUsers })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const handleCreateUserForOrganization = async (
  req: RequestWithUser,
  res: Response
) => {
  const { organizationId } = req.user
  const { name, email, password, roles } = req.body

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ error: 'Email, password and username are required' })
  }

  const foundUser = await getUserByEmail(email)

  if (foundUser) {
    return res.status(400).json({ error: 'User already exists' })
  }

  try {
    const newUser = await createUser({
      name,
      email,
      authentication: {
        password: await hashPassword(password)
      },
      roles,
      organizationId
    })
    return res.status(201).json({ success: true, data: newUser })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
