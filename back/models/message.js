import mongoose from 'mongoose'
import dotEnv from 'dotenv'
// import pick from 'lodash/pick'
import autoIncrement from 'mongoose-auto-increment'
import db from '../db/db'
autoIncrement.initialize(db)
dotEnv.config()

let MessageSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  userID: { type: String },
  creationDate: {type: Date, default: Date.now()},
  read: { type: Boolean, default: false },
  receiverId: { type: String },
  senderId: String
})

// MessageSchema.methods.toJSON = function () {
//   let message = this
//   let messageObject = message.toObject()
//   return pick(messageObject, ['userID', 'title', 'content', 'creationDate'])
// }

MessageSchema.plugin(autoIncrement.plugin, {
  model: 'Message',
  startAt: 100
})
let Message = db.model('Message', MessageSchema)
export default Message
