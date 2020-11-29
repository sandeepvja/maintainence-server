var express = require('express');
var router = express.Router();
var owners_dao = require('../dao/owners_dao');

router.post('/', function(req, res, next) {
  owners_dao.insertOwner(req.body, function(err, doc, num_rows) {
      if(!err) {
        res.json({inserted: 1})
      } else {
        res.status(412)
        res.json({error: err})
      }
  });
});
router.get('/', function(req, res, next) {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);

  owners_dao.getOwners(page, limit, function(err, docs){
    res.json(docs);
  });
});

module.exports = router;
