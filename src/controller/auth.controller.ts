import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { promises } from 'fs'
import path from 'path'
import dbusers from '../model/users.json'

type UserType = {
  username: string
  password: string
}

const userDB = {
  users: dbusers as UserType[],
  setUsers: function (data: UserType[]) {
    this.users = data
  }
}

export const handleUserRegister = async (req: Request, res: Response) => {
  const { user, password } = req.body
  if (!user || !password)
    return res.status(400).json({ message: 'Username or password required' })
  //check for duplicate usernames
  const duplicate = dbusers.find((person: UserType) => person.username === user)
  if (duplicate) return res.status(409).json({ message: 'User already exists' }) //Conflict

  try {
    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10)
    //store the new user
    const newUser = { username: user, password: hashedPassword }
    userDB.setUsers([...userDB.users, newUser])

    await promises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    )

    res.status(201).json({ success: true, message: 'User created' })
  } catch (error) {
    res.send(500).json({ message: 'Server error' })
  }
}

export const handleUserLogin = async (req: Request, res: Response) => {
  const { user, password } = req.body
  if (!user || !password)
    return res.status(400).json('username and password are required')

  const foundUser = userDB.users.find((person) => person.username === user)

  if (!foundUser) return res.sendStatus(401)

  try {
    const passwordMatch = await bcrypt.compare(password, foundUser.password)

    if (!passwordMatch) return res.sendStatus(401)

    return res.status(200).json(foundUser)
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}
