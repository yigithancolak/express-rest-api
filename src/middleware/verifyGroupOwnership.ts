import { NextFunction, Response } from 'express'
import { getGroupById } from '../db/operations/groupOperations'
import { RequestWithFoundGroup } from '../types/requestTypes'

export const verifyGroupOwnership = async (
  req: RequestWithFoundGroup,
  res: Response,
  next: NextFunction
) => {
  const { organizationId } = req.user
  const groupId = req.params.id

  if (!groupId)
    return res
      .status(400)
      .json({ success: false, message: 'Id parameter is required in url' })

  try {
    const foundGroup = await getGroupById(groupId)

    if (!foundGroup)
      return res
        .status(404)
        .json({ success: false, message: 'Group has not found' })

    if (foundGroup.organizationId.toString() !== organizationId.toString())
      return res.status(400).json({
        success: false,
        message: 'Not permitted for accessing that group'
      })

    req.foundGroup = foundGroup
    next()
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
