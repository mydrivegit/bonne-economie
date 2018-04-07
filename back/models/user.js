import mongoose from 'mongoose'
// import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'
import pick from 'lodash/pick'
import autoIncrement from 'mongoose-auto-increment'
import db from '../db/db'
autoIncrement.initialize(db)
dotEnv.config()

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String
},
{
  // https://stackoverflow.com/questions/10006218/which-schematype-in-mongoose-is-best-for-timestamp
  timestamps: true
})

UserSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()
  return pick(userObject, ['_id', 'username', 'firstName', 'lastName'])
}

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  startAt: 100
})
let User = db.model('User', UserSchema)
export default User
