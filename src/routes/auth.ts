import { Router } from 'express'
import { registerUser } from '../controller/auth.controller'

//   /auth/*
export const authRouter = Router()

authRouter.post('/register', registerUser)
