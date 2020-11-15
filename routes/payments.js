var express = require('express');
var mongodb = require('./mongodb_client')

var router = express.Router();

dbName = "apartment"
paymentsCollection = "payments"

router.post('/', function(req, res, next) {
  mongodb.insertDocument(db, paymentsCollection, req.body)
  res.json({ inserted: true });
});
router.get('/', function(req, res, next) {
  mongodb.getDocuments(db, paymentsCollection, res)
});
module.exports = router;
