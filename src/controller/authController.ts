import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {
  createUser,
  getUserByEmail,
  getUserByRefreshToken
} from '../db/operations/userOperations'
import createTokenPayload from '../helpers/jwtHelpers'
import { hashPassword } from '../helpers/passwordHelpers'

export const handleRegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, roles } = req.body

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: 'Email, password and username are required' })
    }

    const foundUser = await getUserByEmail(email)

    if (foundUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await createUser({
      email,
      name,
      authentication: {
        password: await hashPassword(password)
      },
      roles
    })

    return res.status(200).json({ success: true, data: user })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const handleLoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const refreshToken = req.cookies?.refreshToken as string

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Email and password are required' })

  try {
    const user = await getUserByEmail(email).select(
      '+authentication.password +authentication.refreshToken'
    )
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.authentication.password)

    if (!match)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' })

    //toObject() for document --> object
    const tokenPayload = createTokenPayload(user)
    //tokens
    const accessToken = jwt.sign(
      tokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m'
      }
    )

    const newRefreshToken = jwt.sign(
      tokenPayload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    )

    let newRefreshTokenArray = !refreshToken
      ? user.authentication.refreshToken
      : user.authentication.refreshToken.filter((rt) => rt !== refreshToken)

    if (refreshToken) {
      /* 
        Scenario added here: 
            1) User logs in but never uses RT and does not logout 
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */

      const foundToken = await getUserByRefreshToken(refreshToken).select(
        '+authentication.refreshToken'
      )

      // Detected refresh token reuse!
      if (!foundToken) {
        console.log('attempted refresh token reuse at login!')
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = []
      }

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
        //todo: path + domain
      })
    }

    user.authentication.refreshToken = [
      ...newRefreshTokenArray,
      newRefreshToken
    ]

    // Save the refresh token to the user's document

    await user.save()

    //

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // set to true if in a production environment
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000 // cookie expiration in milliseconds

      //todo: path+domain
    })

    return res.status(200).json({
      success: true,
      data: { ...user.toObject(), authentication: { accessToken } }
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

// remember clear cookie on logout
// res.clearCookie('refreshToken');
