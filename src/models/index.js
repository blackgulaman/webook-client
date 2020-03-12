const mongoose = require('mongoose');
const container = require('typedi').Container;
const log = require('../libs/winston')('model/clients/index.js');
mongoose.Promise = global.Promise;

try {
  const connection = container.get('webookDbConnection');
  exports.clients = require('./client-model')(mongoose, connection);
} catch (error) {
  log.error('Error in try catch! ', error);
}

// module.exports = () => {
//   try {
//     // Schema for client model
//     const connection = container.get('webookDbConnection');
//     const clients = require('./client-model')(mongoose, connection);
//     return { clients };
//   } catch (error) {
//     log.error('Error in try catch! ', error);
//   }
// };
