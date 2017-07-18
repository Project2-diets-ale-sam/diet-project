const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.user + " user");
  if (req.user) {
    req.session.currentUser = req.user;
    res.render('index', {session: req.session.currentUser });
  }else {
    res.render('index', {session: undefined });
  }

});

module.exports = router;
