import { config } from 'dotenv'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getUserById } from '../db/operations/userOperations'
import { UserJWT } from '../helpers/jwtHelpers'

config()

export const handleRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken

  if (!refreshToken) return res.sendStatus(401)

  // Verify the refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    async (err: Error, userPayload: UserJWT) => {
      if (err) {
        return res.sendStatus(403)
      }

      // Get the user from the database using the user ID from the payload
      const user = await getUserById(userPayload.id).select(
        '+authentication.refreshToken'
      )

      // Check if the refresh token in the database matches the one sent by the client
      if (user && user.authentication.refreshToken === refreshToken) {
        // Generate a new access token
        const { authentication, ...userWithoutAuth } = user.toObject()
        const accessToken = jwt.sign(
          userWithoutAuth,
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: '15m' }
        )

        return res.status(200).json({ success: true, accessToken })
      } else {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid token' })
      }
    }
  )
}
