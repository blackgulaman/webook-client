const mongoose = require('mongoose');
const container = require('typedi').Container;

const log = require('../libs/winston')('mongodb.js');
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
    container.set('webookDbConnection', connection);

    if (!container.get('webookDbConnection'))
      throw new Error('Failed to connect to database');
    
      return container.get('webookDbConnection');
  } catch (error) {
    log.error('Error in catch! ', error);
    return null;
  }
};
