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
  read: { type: Boolean, default: false },
  receiverId: { type: String },
  senderId: String
},
{
  // https://stackoverflow.com/questions/10006218/which-schematype-in-mongoose-is-best-for-timestamp
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
