const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const saleSchema = new Schema({
    sale: [],
    total:Number,
    salesMan:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    store:String,
  }, 
{
  timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;