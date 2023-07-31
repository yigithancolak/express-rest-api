import { Router } from 'express'
import {
  handleUserLogin,
  handleUserRegister
} from '../controller/auth.controller'

//   /auth/*
export const authRouter = Router()

authRouter.post('/register', handleUserRegister)

authRouter.get('/login', handleUserLogin)
