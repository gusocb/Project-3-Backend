const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  
  {
    barcode: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product",productSchema);
module.exports = Product;