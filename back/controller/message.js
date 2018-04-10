import dotEnv from 'dotenv'
import Message from '../models/message'
import User from '../models/user'

//  dotenv config
dotEnv.config()

exports.message_get_userId = (req, res, next) => {
  const _userId = req.userData.userId
  User.find({ _userId })
    .exec().then(Message.find({ userID: _userId })
      .exec()
      .then((docs) => {
        if (docs.length >= 1) {
          return res.status(200).send(docs)
        } else {
          return res.status(204).send({
            message: 'Inbox is empty'
          })
        }
      }).catch((err) => {
        res.status(500).send(err.message)
      })).catch((err) => {
      res.status(500).send(err.message)
    })
}

exports.message_get_all = (req, res, next) => {
  Message.find()
    .exec()
    .then((docs) => {
      if (docs.length >= 0) {
        res.status(200).send(docs)
      } else {
        res.status(404).send({
          message: 'No Message Found in database'
        })
      }
    }).catch((err) => {
      res.status(500).send(err.errmsg)
    })
}

exports.message_post = (req, res, next) => {
  const message = new Message({
    title: req.body.title,
    content: req.body.content,
    receiverId: req.body._id,
    userID: req.body._id,
    senderId: req.userData.userId
  })
  message.save()
    .then(res.status(200).send({ success: true }))
    .catch((err) => {
      res.status(500).send(err.errmsg)
    })
}

exports.message_delete = (req, res, next) => {
  const _userId = req.userData.userId
  Message.remove({ userID: _userId }).exec().then((docs) => {
    res.status(200).send({
      message: docs
    })
  }).catch((err) => {
    res.status(500).send({
      message: err.message
    })
  })
}

exports.message_get_paramsId = (req, res, next) => {
  const id = req.params.id
  Message.findById(id).exec().then((result) => {
    if (result) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        result: result
      })
    } else {
      res.status(204).send({
        message: 'Message not found'
      })
    }
  }).catch(err => {
    console.log(err)
    res.status(500).send({
      message: 'Message not found',
      error: err.name

    })
  })
}

exports.message_patch_paramsId = (req, res, next) => {
  const id = req.params.id
  const updateOps = {}
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Message.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(200).send(docs)
    }).catch((err) => {
      res.status(500).send(err.errmsg)
    })
}
