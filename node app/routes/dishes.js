var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/createtable', function (req, res) {
  var sql =
    'CREATE TABLE dishes(name varchar(100),description text,dishes_id int AUTO_INCREMENT PRIMARY KEY,category_id int, FOREIGN KEY (category_id) REFERENCES categories(category_id),price int)';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.post('/', function (req, res) {
  const { name, description, category_id, price } = req.body;
  var sql = `INSERT INTO dishes (name, description, category_id, price) VALUES (?,?,?,?)`;
  connector.query(
    sql,
    [name, description, category_id, price],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
router.get('/', function (req, res) {
  var sql = 'SELECT * FROM dishes';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
});
router.get('/name/:name', function (req, res) {
  var sql = `SELECT * FROM dishes WHERE name="${req.params.name}"`;
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
});
router.delete('/:id', function (req, res) {
  const sql = `DELETE FROM dishes WHERE dishes_id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/deleteall', function (req, res) {
  const sql = `DELETE FROM dishes`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put('/update/:dishes_id', function (req, res) {
  const { name, description, dishes_id, category_id, price } = req.body;
  var sql = `UPDATE dishes SET name=?, description=?, dishes_id=?, category_id=?, price=? WHERE dishes_id=${parseInt(
    req.params.dishes_id
  )}`;
  connector.query(
    sql,
    [name, description, dishes_id, category_id, price],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
module.exports = router;
