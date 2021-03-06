import express from 'express'
import multer from 'multer'
import auth from '../middleware/auth-middleware'
import productController from '../controller/product'

const product = express.Router()
//  config for upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({
  storage,
  fileFilter
})
//  verification of login authentication middleware

product.use(auth)
  .get('/', productController.product_get_userId)
  .get('/all', productController.product_get_all)
  .post('/', upload.single('productImage'), productController.product_post)
  .delete('/', productController.product_delete)
  .get('/:id', productController.product_get_paramsId)
  .patch('/:id', productController.product_patch_paramsId)

export default product
