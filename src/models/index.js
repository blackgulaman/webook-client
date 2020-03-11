const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const log = require('../libs/winston')('model/clients/index.js');
const configs = require('../configs');

module.exports = async () => {
  try {
    // Import the class for mongo helper
    const mongoDbHelper = require('../libs/mongodb-helper');
    const webookHelper = new mongoDbHelper(
      mongoose,
      configs.db.DB_HOST,
      configs.db.DB_OPTIONS
    );
    // Connection for webook db
    const connection = await webookHelper.connect();
    // Schema for client model
    const clients = require('./client-model')(mongoose, connection);
    return { clients };
  } catch (error) {
    log.error('Error in try catch! ', error);
  }
};
