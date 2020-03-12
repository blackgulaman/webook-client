const mongoose = require('mongoose');
const container = require('typedi').Container;

mongoose.Promise = global.Promise;
const connection = container.get('webookDbConnection');

const schema = new mongoose.Schema(
  {
    gmailId: String,
    email: String,
    username: String,
    password: String,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    image: String,
    age: Number,
    contactNo: String,
    creationType: String,
    status: String
  },
  { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } }
);
module.exports = connection.model('Clients', schema);
