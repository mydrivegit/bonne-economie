import express from 'express'
import auth from '../middleware/auth-middleware'
import messageController from '../controller/message'

const messages = express.Router()
//  verification of login authentication middleware
messages.use(auth)
  .get('/', messageController.message_get_userId)
  .get('/all', messageController.message_get_all)
  .post('/', messageController.message_post)
  .delete('/', messageController.message_delete)
  .get('/:id', messageController.message_get_paramsId)
  .patch('/:id', messageController.message_patch_paramsId)

export default messages
