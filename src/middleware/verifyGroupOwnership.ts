import { NextFunction, Response } from 'express'
import { getGroupsByInstructor } from '../db/operations/groupOperations'
import { RequestWithUser } from './verifyJWT'

export const verifyGroupOwnership = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = req.params.id
    const groups = await getGroupsByInstructor(req.user.id)

    if (!groups.some((group) => group._id.toString() === groupId)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this group'
      })
    }

    next()
  } catch (error) {
    console.error(error) // Log the error
    res
      .status(500)
      .json({ success: false, message: 'An unexpected error occurred' })
  }
}
