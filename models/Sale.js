const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const saleSchema = new Schema({
    sale: [],
    total:Number,
    // owner: {type: Schema.Types.ObjectId, ref: 'User'}
    owner:String
}, 
{
  timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;