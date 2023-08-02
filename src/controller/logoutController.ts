import { config } from 'dotenv'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { getUserById } from '../db/operations/userOperations'
import { UserJWT } from '../helpers/jwtHelpers'
import { RequestWithUser } from '../middleware/verifyJWT'

config()

export const handleLogout = async (req: RequestWithUser, res: Response) => {
  const refreshToken = req.cookies?.refreshToken

  if (!refreshToken) return res.sendStatus(204) //no content

  const user = jwt.decode(refreshToken) as UserJWT

  const foundUser = await getUserById(user.id).select(
    '+authentication.refreshToken'
  )
  if (!foundUser) {
    res.clearCookie('refreshToken', { httpOnly: true })
    return res.sendStatus(204)
  }

  foundUser.authentication.refreshToken = null
  await foundUser.save()

  res.clearCookie('refreshToken', { httpOnly: true })
  return res.sendStatus(204) // No content
}
