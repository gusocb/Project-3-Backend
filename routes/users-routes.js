const express    = require('express');
const router     = express.Router();
const bcrypt     = require('bcryptjs');
const User       = require('../models/User');


router.post('/users/add', (req, res) => {
    const {name, lastname, store, username, password, role} = req.body
  
    if (!name) {
      res.status(400).json({ message: 'Provide name' });
      return;
    }

    if (!lastname) {
        res.status(400).json({ message: 'Provide lastname' });
        return;
      }

    if (!store) {
        res.status(400).json({ message: 'Provide store' });
        return;
      }
    if (!username) {
        res.status(400).json({ message: 'Provide username' });
        return;
      }

    if (!password) {
        res.status(400).json({ message: 'Provide password' });
        return;
      }

    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }

    // if (!role) {
    //     res.status(400).json({ message: 'Provide role' });
    //     return;
    //   }
  
    User.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "username check went bad."});
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
            name:name,
            lastname:lastname,
            store:store,
            username:username,
            password: hashPass,
            role: role
        });
  
        aNewUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            else {
              res.json({message: 'New user added'})
            }

        });
    });
});

//All Users
router.get('/users', (req, res) => {
    User.find({store:req.user.store})
    .then(users => res.json(users))
    .catch(err => console.log(err))
  });

//User Detail
  router.get('/users/detail/:id',(req,res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => console.log(err))
  });
  
  //Update User
  router.put('/users/detail/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id,{...req.body})
    .then(res.json('User Updated'))
    .catch(err => console.log(err))
  });
  
  //Delete User
  router.delete('/users/detail/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(res.json('User Deleted'))
    .catch(err => console.log(err))
  });
  
  module.exports = router;
