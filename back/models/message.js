import mongoose from 'mongoose'
// import pick from 'lodash/pick'
import autoIncrement from 'mongoose-auto-increment'
import db from '../db/db'
autoIncrement.initialize(db)

let MessageSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  userID: { type: String },
  read: { type: Boolean, default: false },
  receiverId: { type: String },
  senderId: String
},
{
  timestamps: true
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
