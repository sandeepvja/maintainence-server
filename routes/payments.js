var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

dbName = "apartment"
url = "mongodb://localhost:27017/"
paymentsCollection = "payments"

function insertPayment(obj) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(paymentsCollection).insertOne(obj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
     });
    });
}

function getPayments(res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection(paymentsCollection).find({}).toArray(function (err, docs) {
     if (err) throw err;
     db.close()
     res.json(docs)
    })
  });
}
router.post('/', function(req, res, next) {
  insertPayment(req.body)
  res.json({ inserted: true });
});
router.get('/', function(req, res, next) {
  getPayments(res)
});
module.exports = router;
