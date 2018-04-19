import dotEnv from 'dotenv'
import Product from '../models/product'
import User from '../models/user'

//  dotenv config
dotEnv.config()

exports.product_get_userId = (req, res, next) => {
  const _userId = req.userData.userId
  User.find({ _userId })
    .exec().then(Product.find({ userId: _userId })
      .exec()
      .then((docs) => {
        if (docs.length >= 1) {
          return res.status(200).send(docs)
        } else {
          return res.status(204).send({
            message: 'basket is empty'
          })
        }
      }).catch((err) => {
        res.status(500).send(err.message)
      })).catch((err) => {
      res.status(500).send(err.message)
    })
}

exports.product_get_all = (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      if (docs.length >= 0) {
        res.status(200).send(docs)
      } else {
        res.status(404).send({
          message: 'No Product Found in database'
        })
      }
    }).catch((err) => {
      res.status(500).send(err.errmsg)
    })
}

exports.product_post = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    userId: req.userData.userId,
    price: req.body.price,
    productImage: req.file.path,
    city: req.body.city,
    pincode: req.body.pincode
  })
  product.save()
    .then(res.status(200).send({ success: true }))
    .catch((err) => {
      res.status(500).send('HERE I HAVE ERROR' + err.errmsg)
    })
}

exports.product_delete = (req, res, next) => {
  const _userId = req.userData.userId
  Product.remove({ userID: _userId }).exec().then((docs) => {
    res.status(200).send({
      message: docs
    })
  }).catch((err) => {
    res.status(500).send({
      message: err.message
    })
  })
}

exports.product_get_paramsId = (req, res, next) => {
  const id = req.params.id
  Product.findById(id).exec().then((result) => {
    if (res) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        result: result
      })
    } else {
      res.status(204).send({
        message: 'Product not found'
      })
    }
  }).catch(err => {
    console.log(err)
    err.status(500).send({
      message: 'Product not found',
      error: err.name

    })
  })
}

exports.product_patch_paramsId = (req, res, next) => {
  const id = req.params.id
  const updateOps = {}
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(200).send(docs)
    }).catch((err) => {
      res.status(500).send(err.errmsg)
    })
}
