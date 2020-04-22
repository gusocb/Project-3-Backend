const express = require('express');
const router  = express.Router();
let Product = require('../models/Product')

//Roles middleware
const checkRoles = require('../middlewares/checkRoles')


//All products
router.get('/products', (req, res) => {
  Product.find({store:req.user.store})
  .then(products => res.json(products))
  .catch(err => console.log(err))
});

//Add product
router.post('/products/add',checkRoles('admin'),(req,res) => {
  const {barcode, name, price, stock, store} = req.body;

  Product.findOne({store:req.user.store,barcode:barcode}, (err,foundProduct) =>{
    if(err){
      res.status(500).json({message: "product check went bad."});
      return;
  }

  if (foundProduct) {
      res.status(401).json({ message: 'barcode taken. Choose another one.' });
      return;
  }

  const newProduct = new Product ({barcode, name, price, stock,store});

  newProduct.save(err => {
    if (err) {
        res.status(400).json({ message: 'Saving product to database went wrong.' });
        return;
    }
    else {
      res.json({message: 'New product added'})
    }

});

  })
});

//Product Detail
router.get('/products/detail/:id',checkRoles('admin'),(req,res) => {
  Product.findById(req.params.id)
  .then(product => res.json(product))
  .catch(err => console.log(err))
});

//Update product
router.put('/products/detail/:id', checkRoles('admin'),(req, res) => {
  Product.findByIdAndUpdate(req.params.id,{...req.body})
  .then(res.json('Product Updated'))
  .catch(err => console.log(err))
});

//Delete product
router.delete('/products/detail/:id', checkRoles('admin'), (req, res) => {
  Product.findByIdAndDelete(req.params.id)
  .then(res.json('Product Deleted'))
  .catch(err => console.log(err))
});

module.exports = router;
