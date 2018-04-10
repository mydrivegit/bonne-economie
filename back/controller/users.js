import User from '../models/user'

exports.users_get_all = (req, res, next) => {
  User.find().exec().then((docs) => {
    res.status(200).send({
      success: true,
      content: docs
    })
  }).catch((err) => {
    res.status(500).send(err.errmsg)
  })
}

exports.users_get_profile = (req, res, next) => {
  const id = req.userData.userId
  User.find({ _id: id }).exec().then((doc) => {
    if (doc.length >= 1) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        doc: doc
      })
    } else {
      res.status(204).send({
        message: 'Data not found'
      })
    }
  }).catch(err => {
    console.log(err)
    res.status(500).send({
      error: err
    })
  })
}

exports.users_get_all_paramsid = (req, res, next) => {
  const id = req.params.id
  User.findById(id).exec().then((result) => {
    if (result) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        result: result
      })
    } else {
      res.status(204).send({
        message: 'User not found'
      })
    }
  }).catch(err => {
    console.log(err)
    res.status(500).send({
      message: 'User not found',
      error: err.name

    })
  })
}

exports.users_patch_userdetails = (req, res, next) => {
  const userId = req.userData.userId
  const updateOps = {}
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  User.update({ _id: userId }, { $set: updateOps })
    .exec()
    .then((docs) => {
      console.log(docs)
      res.status(200).send({
        message: docs
      })
    })
    .catch((err) => {
      console.log(err)
      console.log(userId)
      res.status(500).send(err.errmsg)
    })
}

exports.users_delete = (req, res, next) => {
  const userId = req.userData.userId
  User.remove({ _id: userId }).exec().then((docs) => {
    res.status(200).send({
      message: docs
    })
  }).catch((err) => {
    res.status(500).send({
      message: err.message
    })
  })
}
