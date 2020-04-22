const express    = require('express');
const router     = express.Router();
const bcrypt     = require('bcryptjs');
const User       = require('../models/User');

//ROLES MIDDLEWARE
const checkRoles = require('../middlewares/checkRoles')

//Add new user
router.post('/users/add', checkRoles('admin'),(req, res) => {
    const {name, lastname, store, username, password, role} = req.body
  
    User.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "username check went bad."});
            return;
        }

        if (foundUser) {
            res.status(401).json({ message: 'username taken. Choose another one.' });
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
router.get('/users', checkRoles('admin'),(req, res) => {
    User.find({store:req.user.store})
    .then(users => res.json(users))
    .catch(err => console.log(err))
  });

//User Detail
  router.get('/users/detail/:id',checkRoles('admin'),(req,res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => console.log(err))
  });

  
  //Update User
  router.put('/users/detail/:id', checkRoles('admin'),(req, res) => {
    User.findByIdAndUpdate(req.params.id,{...req.body})
    .then(res.json('User Updated'))
    .catch(err => console.log(err))
  });
  
  //Delete User
  router.delete('/users/detail/:id', checkRoles('admin'),(req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(res.json('User Deleted'))
    .catch(err => console.log(err))
  });
  
  module.exports = router;
