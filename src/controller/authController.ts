import { config } from 'dotenv'
import { Request, Response } from 'express'
import { createUser, getUserByEmail } from '../db/users'
import { hashPassword } from '../helpers'

config()

export const registerUser = async (req: Request, res: Response) => {
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
