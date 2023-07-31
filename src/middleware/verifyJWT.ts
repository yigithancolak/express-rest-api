import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

config()

export interface RequestWithUser extends Request {
  user: JwtPayload
}

export const verifyJWT = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.sendStatus(401)
  const token = authHeader.split(' ')[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err, user: JwtPayload) => {
      if (err) return res.sendStatus(403) //invalid token
      req.user = user
      next()
    }
  )
}
