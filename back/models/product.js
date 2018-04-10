import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import db from '../db/db'
autoIncrement.initialize(db)

let ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  picture: { type: [String] },
  userId: { type: String, required: true },
  country: { type: String },
  region: { type: String },
  city: { type: String },
  street: { type: String },
  longitude: { type: Number },
  latitude: { type: Number }
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
