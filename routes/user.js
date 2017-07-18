const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
// CRUD => R: Retrieve All Users ¿??
router.get('/', function(req, res, next) {
  User.find({}, (err, u) => {
    res.render('product', {
      title: 'Express Marc',
      users: u
    });
  });
});

// CRUD => U: Update a product
router.post('/:id/edit', function(req, res, next) {
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  let updates = {
    name: req.body.name,
    password: hashPass,
    email: req.body.email,
    description: req.body.description
  };
  User.findByIdAndUpdate(req.params.id, updates, (err, p) => {
    if(err){
      console.log(err);
    }
    res.redirect(`/`);
  });
});
// CRUD => R: Retrieve - User detail
router.get('/:id', function(req, res, next) {

  User.findById(req.params.id, (err, u) => {
    if(err){
      console.log(err);
    }
    res.render('user/profile', {
      title: 'Profile',
      user: u
    });
  });
});

module.exports = router;
