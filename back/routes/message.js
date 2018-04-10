import express from 'express'
import auth from '../middleware/auth-middleware'
import messageController from '../controller/message'

const messages = express.Router()
//  verification of login authentication middleware
messages.use(auth)

messages.get('/', messageController.message_get_userId)

messages.get('/all', messageController.message_get_all)

messages.post('/', messageController.message_post)

messages.delete('/', messageController.message_delete)

messages.get('/:id', messageController.message_get_paramsId)

messages.patch('/:id', messageController.message_patch_paramsId)

export default messages
