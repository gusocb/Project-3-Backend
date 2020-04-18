const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cashCloseSchema = new Schema({
    sales: [],
    totalDay:Number,
    owner:String,
  }, 
{
  timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;