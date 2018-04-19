import express from 'express'
import authController from '../controller/auth'

let auth = express.Router()
  .post('/signup', authController.users_signUp)
  .post('/login', authController.users_loginIn)

export default auth
