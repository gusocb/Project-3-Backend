const express = require('express');
const router  = express.Router();
let Sale = require('../models/Sale')

//Add sale
router.post('/checkout',(req,res) => {
    
    Sale.create({ 
        sale: ['jon', 'gus','pepe'],
        total:15,
        owner:'el chido'
    })
      .then(() => res.json('sale added'))
      .catch(err => console.log(err))
    
});

module.exports = router;