import express from 'express'
import auth from '../middleware/auth-middleware'
import usersController from '../controller/users'
let users = express.Router()

users.use(auth)
  .get('/', usersController.users_get_all)
  .get('/profile', usersController.users_get_profile)
  .get('/:id', usersController.users_get_all_paramsid)
  .patch('/', usersController.users_patch_userdetails)
  .delete('/', usersController.users_delete)

export default users
