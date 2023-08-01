import { Request, Response } from 'express'
import { getUsers } from '../db/operations/userOperations'

export const handleGetAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await getUsers()
    return res.status(200).json({ success: true, data: allUsers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
