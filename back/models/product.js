import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import db from '../db/db'
autoIncrement.initialize(db)

let ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
  productImage: { type: String },
  city: { type: String },
  region: { type: String },
  country: { type: String }
},
{
  timestamps: true
})

ProductSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  startAt: 100
})
let Product = db.model('Product', ProductSchema)
export default Product
