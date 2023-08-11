import { Request, Response } from 'express'
import {
  getUserById,
  getUserByRefreshToken
} from '../db/operations/userOperations'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import createTokenPayload, { UserJWT } from '../helpers/jwtHelpers'

export const handleRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken as string
  if (!refreshToken) return res.sendStatus(401)
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
    //todo: path + domain
  })
  const foundUser = await getUserByRefreshToken(refreshToken).select(
    '+authentication.refreshToken'
  )

  console.log(foundUser)

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err: JsonWebTokenError, decoded: UserJWT) => {
        if (err) return res.sendStatus(403) //Forbidden
        console.log('attempted refresh token reuse!')
        const hackedUser = await getUserById(decoded.id).select(
          '+authentication.refreshToken'
        )
        hackedUser.authentication.refreshToken = []
        const result = await hackedUser.save()
        console.log(result)
      }
    )
    return res.sendStatus(403) //Forbidden
  }

  const newRefreshTokenArray = foundUser.authentication.refreshToken.filter(
    (rt) => rt !== refreshToken
  )

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err: JsonWebTokenError, decoded: UserJWT) => {
      if (err) {
        console.log('expired refresh token')
        foundUser.authentication.refreshToken = [...newRefreshTokenArray]
        const result = await foundUser.save()
        console.log(result)
      }
      if (err || foundUser._id.toString() !== decoded.id.toString())
        return res.sendStatus(403)

      const tokenPayload = createTokenPayload(foundUser)

      // Refresh token was still valid
      const accessToken = jwt.sign(
        tokenPayload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      const newRefreshToken = jwt.sign(
        tokenPayload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '30d' }
      )
      // Saving refreshToken with current user
      foundUser.authentication.refreshToken = [
        ...newRefreshTokenArray,
        newRefreshToken
      ]

      await foundUser.save()

      // Creates Secure Cookie with refresh token
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
      })

      res.status(201).json({ success: true, data: accessToken })
    }
  )
}
