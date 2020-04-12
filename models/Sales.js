const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const saleSchema = new Schema({
    sale: [],
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
}, 
{
  timestamps: true
});

const Sale = mongoose.model('User', saleSchema);
module.exports = Sale;