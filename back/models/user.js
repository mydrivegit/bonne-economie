import mongoose from 'mongoose'
import pick from 'lodash/pick'
import autoIncrement from 'mongoose-auto-increment'
import db from '../db/db'
autoIncrement.initialize(db)

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
