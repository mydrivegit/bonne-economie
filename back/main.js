// Basic Import Modules
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
// import users package from users
import auth from './routes/auth'
import users from './routes/users'
import messages from './routes/message'
import product from './routes/product'

//  app express
let app = express()

//  dotenv config
dotenv.config()

// morgan error handling config
app.use(morgan('dev'))

//  cors config
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// config the upload folder into public
app.use('/upload', express.static('uploads'))

//  Diecting to users file in models folder
app.use('/auth', auth)
app.use('/users', users)
app.use('/messages', messages)
app.use('/product', product)

//  Handling error if there any wrong Url is requested
app.use((req, res, next) => {
  const err = new Error('Url is not found')
  err.status = 404
  next(err)
})
//  Handling error if there any wrong Url is requested
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    err: {
      message: err.message
    }
  })
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log('LoginSystem app for backend precess is listening on port ' + port + '!'))
