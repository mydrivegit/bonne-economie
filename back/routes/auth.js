import express from 'express'
import authController from '../controller/auth'

let auth = express.Router()

auth.post('/signup', authController.users_signUp)

auth.post('/login', authController.users_loginIn)

export default auth
