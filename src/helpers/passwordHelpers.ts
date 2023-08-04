import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

export const comparePassword = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash)
  return match
}
