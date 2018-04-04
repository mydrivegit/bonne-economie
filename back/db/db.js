// MONGOOSE MONGODB CONNECT
import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
// Init .env
import dotEnv from 'dotenv'
dotEnv.config()
mongoose.Promise = global.Promise

let url = 'mongodb://localhost:' + process.env.MONGOSERVERPORT + '/login_system'

let db = mongoose.createConnection(url, {}, (err) => {
  if (err) {
    throw err
  } else {
    console.log('Mongodb connected on port:' + process.env.MONGOSERVERPORT)
  }
})

autoIncrement.initialize(db)

export default db
