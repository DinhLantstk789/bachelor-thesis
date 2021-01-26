var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('{status:success, id: 123, name: Anh}');
});

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.send('api for user register');
});

/* GET users listing. */
router.get('/logout', function(req, res, next) {
  res.send('api for user logout');
});



module.exports = router;
