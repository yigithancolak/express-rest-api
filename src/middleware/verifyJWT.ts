import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface RequestWithUser extends Request {
  user: string
}

interface PayloadWithUsername extends JwtPayload {
  username: string
}

export const verifyJWT = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.sendStatus(401)
  console.log(authHeader)
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) return res.sendStatus(403) //invalid token

    const payload = decoded as PayloadWithUsername
    req.user = payload.username
    next()
  })
}
