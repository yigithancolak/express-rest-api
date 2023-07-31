import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const random = () => crypto.randomBytes(128).toString('base64')
export const hashPassword = async (password: string) => {
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}
export const comparePassword = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash)
  return match
}
