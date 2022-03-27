var express = require('express');
var router = express.Router();

/* GET users listing. */
var express = require('express');
var router = express.Router();
router.get('/setcookie/:city/:value', function (req, res) {
  res.cookie(req.params.city, req.params.value);
  res.send(`cookie with name ${req.params.city} and value ${req.params.value}`);
});
router.get('/setcookiewithtime/:name/:value/:time', function (req, res) {
  res.cookie(req.params.name, req.params.value, {
    maxAge: req.params.time * 60 * 1000,
  });
  res.send(
    `cookie with name ${req.params.name} and value ${req.params.value} will expire in ${req.params.time}`
  );
});
router.get('/', function (req, res) {
  res.send(req.cookies);
});
module.exports = router;
