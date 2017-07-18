// routes/auth-routes.js
const express    = require("express");
const passport = require("passport");
const path = require('path');
const debug = require('debug')('DietsApp:'+path.basename(__filename));
const User       = require("../models/User");
const authRoutes = express.Router();
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const flash = require("connect-flash");

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup", {user: req.user});
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  console.log(req.body);
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" , user:req.user});
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" , user:req.user});
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = User({
      username: username,
      password: hashPass,
      name: name,
      email: email
    });

    newUser.save((err,user) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" , user: req.user});
      } else {
        debug("Se ha creado el usuario");
        debug(user);
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login",{
    message: req.flash("error"),
    user: req.user
  });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  passReqToCallback: true,
  failureFlash: true
}));

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
