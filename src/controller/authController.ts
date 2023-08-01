import bcrypt from 'bcrypt'
import { config } from 'dotenv'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { createUser, getUserByEmail } from '../db/operations/userOperations'
import { hashPassword } from '../helpers'

config()

export const handleRegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
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
      username,
      authentication: {
        password: await hashPassword(password)
      }
    })

    return res.status(200).json({ success: true, data: user })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const handleLoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Email and password are required' })

  try {
    const user = await getUserByEmail(email).select('+authentication.password')
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
    const userObject = user.toObject()
    //tokens
    const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m'
    })
    const refreshToken = jwt.sign(
      userObject,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    )

    // Save the refresh token to the user's document
    user.authentication.refreshToken = refreshToken
    await user.save()

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // set to true if in a production environment
      sameSite: 'strict', // or 'lax' depending on your needs
      maxAge: 30 * 24 * 60 * 60 * 1000 // cookie expiration in milliseconds
    })

    return res.status(200).json({
      success: true,
      data: { ...userObject, authentication: { accessToken, refreshToken } }
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

// remember clear cookie on logout
// res.clearCookie('refreshToken');
