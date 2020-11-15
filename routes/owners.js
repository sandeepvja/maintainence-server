var express = require('express');
var router = express.Router();

var mongodb = require('./mongodb_client')

db = "apartment"
url = "mongodb://localhost:27017/"
ownersCollection = "owners"

router.post('/', function(req, res, next) {
  mongodb.insertDocument(db, ownersCollection, req.body)
  res.json({ inserted: true });
});
router.get('/', function(req, res, next) {
  mongodb.getDocuments(db, ownersCollection, res)
});

module.exports = router;
