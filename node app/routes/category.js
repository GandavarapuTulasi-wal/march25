var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/createtable', function (req, res) {
  var sql =
    'CREATE TABLE categories(category_id int AUTO_INCREMENT PRIMARY KEY,name varchar(100),description text)';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  var sql = 'SELECT * FROM categories';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
});
router.post('/', function (req, res) {
  const { category_id, name, description } = req.body;
  var sql = `INSERT INTO categories (category_id,name, description) VALUES (?,?,?)`;
  connector.query(
    sql,
    [category_id, name, description],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
router.delete('/:id', function (req, res) {
  const sql = `DELETE FROM categories WHERE category_id=${parseInt(
    req.params.id
  )}`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put('/update/:category_id', function (req, res) {
  const { category_id, name, description } = req.body;
  var sql = `UPDATE categories SET category_id=?,name=?,description=? WHERE category_id=${req.params.category_id}`;
  connector.query(
    sql,
    [category_id, name, description],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
router.get('/deleteall', function (req, res) {
  const sql = `DELETE FROM categories`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;
