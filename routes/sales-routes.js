const express = require('express');
const router  = express.Router();
let Sale = require('../models/Sale')
let Product = require('../models/Product')

//Add sale
router.post('/checkout', (req,res) => {

    Sale.create({ 
        sale:req.body.sale ,
        total:req.body.total,
        owner:req.body.owner
    })
    .then(()=> res.json('sale added'))
    .catch(err => console.log(err))
    
    req.body.sale.forEach( async ele => {
        await Product.findByIdAndUpdate(ele._id,{stock:ele.newStock})
    })
});

module.exports = router;

