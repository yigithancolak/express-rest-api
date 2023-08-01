import { config } from 'dotenv'
import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getUserByEmail } from '../db/operations/userOperations'

config()

export const handleRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken

  if (!refreshToken) return res.sendStatus(401)

  // Verify the refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    async (err: Error, userPayload: JwtPayload) => {
      if (err) {
        return res.sendStatus(403)
      }

      // Get the user from the database using the user ID from the payload
      const user = await getUserByEmail(userPayload.email).select(
        '+authentication.refreshToken'
      )

      console.log('REFRESH: ', refreshToken)
      console.log('USER: ', user)

      // Check if the refresh token in the database matches the one sent by the client
      if (user && user.authentication.refreshToken === refreshToken) {
        // Generate a new access token
        const userObject = user.toObject()
        delete userObject.authentication // Remove authentication details from the response
        const accessToken = jwt.sign(
          userObject,
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: '15m' }
        )

        return res.status(200).json({ success: true, accessToken })
      } else {
        return res
          .status(403)
          .json({ success: false, message: 'Invalid token' })
      }
    }
  )
}
