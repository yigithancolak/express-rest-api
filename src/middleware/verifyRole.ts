import { NextFunction, Response } from 'express'
import { RolesType } from '../db/models/user'
import { RequestWithUser } from './verifyJWT'

export const verifyRole = (role: RolesType) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req?.user.role) return res.sendStatus(401)
    if (req.user.role !== role)
      return res.status(403).json({ message: 'Unauthorized role' })

    next()
  }
}
