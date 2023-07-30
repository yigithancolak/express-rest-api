import { Request, Response } from 'express'
import { registerValidation } from '../validation/register.validation'

export const registerUser = (req: Request, res: Response) => {
  const body = req.body

  const { error } = registerValidation.validate(body)

  if (error) {
    return res.status(400).send(error.details)
  }

  if (body.password !== body.passwordConfirm) {
    return res.status(400).send({
      message: 'ERROR :: Passwords do not match!'
    })
  }

  res.status(200).send(req.body)
}
