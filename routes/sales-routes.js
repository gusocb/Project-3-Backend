const express = require('express');
const router  = express.Router();
let Sale = require('../models/Sale')

//Add sale
router.post('/checkout',(req,res) => {
    
    Sale.create({ 
        sale:req.body.sale ,
        total:req.body.total,
        owner:req.body.owner
    })
      .then(() => res.json('sale added'))
      .catch(err => console.log(err))
    
});

module.exports = router;