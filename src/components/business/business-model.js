const mongoose = require('mongoose');
const container = require('typedi').Container;

mongoose.Promise = global.Promise;
const connection = container.get('webookDbConnection');

const schema = new mongoose.Schema(
  {
    clientId: { type: 'ObjectId', ref: 'clients' },
    businessTypeId: { type: 'ObjectId', ref: 'businessTypes' },
    name: String,
    streetName: String,
    barangay: String,
    city: String,
    province: String,
    country: String,
    zipCode: String,
    latitude: String,
    longitude: String
  },
  { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } }
);
module.exports = connection.model('Business', schema);
