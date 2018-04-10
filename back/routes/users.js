import express from 'express'
import auth from '../middleware/auth-middleware'
import usersController from '../controller/users'
let users = express.Router()

users.use(auth)

users.get('/', usersController.users_get_all)

users.get('/profile', usersController.users_get_profile)

users.get('/:id', usersController.users_get_all_paramsid)

users.patch('/', usersController.users_patch_userdetails)

users.delete('/', usersController.users_delete)

export default users
