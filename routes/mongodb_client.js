var MongoClient = require('mongodb').MongoClient;

url = "mongodb://localhost:27017/"

function getDocuments(dbName, collection, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log(dbName)
    var dbo = db.db(dbName);
    dbo.collection(collection).find({}).toArray(function (err, docs) {
     if (err) throw err;
     db.close()
     res.json(docs)
    })
  });
}

function insertDocument(dbName, collection, obj) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(collection).insertOne(obj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
     });
    });
}

module.exports = {getDocuments: getDocuments, insertDocument: insertDocument};
