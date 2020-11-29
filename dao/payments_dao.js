const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    payment_type:  {
      type: String,
      enum: ['maintainence', 'corpus'],
      required: true
    },
    month: {
      type: String,
      validate: {
        validator: function(monthYearStr) {
          let monthList = [
            'jan', 'feb', 'mar', 'apr',
            'may', 'jun', 'jul', 'aug',
            'sept', 'oct', 'nov', 'dec'
          ]
          let splits = monthYearStr.split(" ")
          if(splits[0] == null) {
            return false
          }
          if(splits[1] == null && !Number.isNumber(splits[1]) && parseInt(splits[1]) < 2020 && parseInt(splits[1]) >= 2030) {
            return false
          }
          let ind = monthList.findIndex(element => element == splits[0])
          if(ind == -1) {
            return false
          }
          return true
        }
      },
      required: true
    },
    flat: {
      type: String,
      enum: [
        '101A', '102A', '201A', '202A', '301A', '302A', '401A', '402A',
        '101B', '102B', '201B', '202B', '301B', '302B', '401B', '402B'
      ],
      required: true
    },
    date: {
      type: String,
      required: true,
      validate: {
        validator: function(dt) {
          let dateRegex = /^(((0[1-9]|[12][0-9]|30)[-]?(0[13-9]|1[012])|31[-]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-]?02)[-]?[0-9]{4}|29[-]?02[-]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/
          return dateRegex.test(dt)
        }
      }
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Invalid Amount"]
    }
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

function getPayments(page, limit, callback) {
  const getPaymentsOptions = {
    skip: page * limit,
    limit: limit
  }
  const query = PaymentModel.find({}, null, getPaymentsOptions);
  query.exec(callback)
}

function insertPayment(doc, callback) {
  var payment = new PaymentModel(doc)
  console.log("Inside insertPayment method");
  payment.save(callback);
}


module.exports = {
  getPayments: getPayments,
  insertPayment: insertPayment
};
