const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const configs = require('../configs');
const log = require('../libs/winston')('mongodb.js');

module.exports = async () => {
  try {
    const mongoDbHelper = require('../libs/mongodb-helper');
    const webookHelper = new mongoDbHelper(
      mongoose,
      configs.db.DB_HOST,
      configs.db.DB_OPTIONS
    );
    const webookDBConnection = webookHelper.connect();
    if (!webookDBConnection) throw new Error('Failed to connect to database');
    return webookDBConnection;
  } catch (error) {
    log.error('Error in catch! ', error);
    return null;
  }
};
