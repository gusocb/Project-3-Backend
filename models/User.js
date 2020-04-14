const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  store: String,
  username: String,
  password: String,
  role:{
    type: String,
    enum: [],
    default: 'ADMIN'
  }
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;