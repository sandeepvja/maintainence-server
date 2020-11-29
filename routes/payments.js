var express = require('express');
var payments_dao = require('../dao/payments_dao');

var router = express.Router();

router.post('/', function(req, res, next) {

  payments_dao.insertPayment(req.body, function(err, doc, num_rows) {
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

  payments_dao.getPayments(page, limit, function(err, docs){
    res.json(docs);
  });
});
module.exports = router;
