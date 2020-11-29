const mongoose = require('mongoose');
const { Schema } = mongoose;

const ownerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true,
    validate: {
      validator: function(mobile_number) {
        let mobile_regex = /^[6-9]\d{9}$/
        return mobile_regex.test(mobile_number)
      }
    }
  },
  flat: {
    type: String,
    enum: [
      '101A', '102A', '201A', '202A', '301A', '302A', '401A', '402A',
      '101B', '102B', '201B', '202B', '301B', '302B', '401B', '402B'
    ],
    required: true
  }
});

const OwnersModel = mongoose.model('Owner', ownerSchema);

function getOwners(page, limit, callback) {
  const getOwnersOptions = {
    skip: page * limit,
    limit: limit
  }
  const query = OwnersModel.find({}, null, getOwnersOptions);
  query.exec(callback)
}

function insertOwner(doc, callback) {
  var owner = new OwnersModel(doc)
  console.log("Inside insertOwner method");
  owner.save(callback);
}

module.exports = {
  getOwners: getOwners,
  insertOwner: insertOwner
};
