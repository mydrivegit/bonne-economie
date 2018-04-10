import express from 'express'
import auth from '../middleware/auth-middleware'
import productController from '../controller/product'

const product = express.Router()
//  verification of login authentication middleware
product.use(auth)

product.get('/', productController.product_get_userId)

product.get('/all', productController.product_get_all)

product.post('/', productController.product_post)

product.delete('/', productController.product_delete)

product.get('/:id', productController.product_get_paramsId)

product.patch('/:id', productController.product_patch_paramsId)

export default product
