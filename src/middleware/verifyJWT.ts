import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserJWT } from '../helpers/jwtHelpers'
import { RequestWithUser } from '../types/requestTypes'

export const verifyJWT = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.sendStatus(401)
  const token = authHeader.split(' ')[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err, jwtPayload: UserJWT) => {
      if (err) return res.sendStatus(403) //invalid token
      req.user = jwtPayload
      next()
    }
  )
}
