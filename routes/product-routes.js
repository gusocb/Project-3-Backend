const express = require('express');
const router  = express.Router();
let Product = require('../models/Product')


//All products
router.get('/products', (req, res) => {
  Product.find({store:req.user.store})
  .then(products => res.json(products))
  .catch(err => console.log(err))
});

//Add product
router.post('/products/add',(req,res) => {
  const {barcode, name, price, stock, store} = req.body;
  const newProduct = new Product ({barcode, name, price, stock,store});

  newProduct.save()
  .then(() => res.json('Product Added'))
  .catch(err => console.log(err))
});

//Product Detail
router.get('/products/detail/:id',(req,res) => {
  Product.findById(req.params.id)
  .then(product => res.json(product))
  .catch(err => console.log(err))
});

//Update product
router.put('/products/detail/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id,{...req.body})
  .then(res.json('Product Updated'))
  .catch(err => console.log(err))
});

//Delete product
router.delete('/products/detail/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id)
  .then(res.json('Product Deleted'))
  .catch(err => console.log(err))
});

module.exports = router;
