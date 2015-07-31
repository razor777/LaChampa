var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/bla', function(req, res, next) {
  res.send('respond with a bla');
});

module.exports = router;
