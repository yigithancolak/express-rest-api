import { NextFunction, Response } from 'express'
import { RolesType } from '../db/models/User'
import { RequestWithUser } from './verifyJWT'

export const verifyRole = (allowedRoles: RolesType[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req?.user.roles) return res.sendStatus(401)
    const isPermitted = allowedRoles.some((role) =>
      req.user.roles.includes(role)
    )
    if (!isPermitted)
      return res.status(403).json({ message: 'Unauthorized role' })

    next()
  }
}
