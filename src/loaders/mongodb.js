
const log = require('../libs/winston')('mongodb.js');

module.exports = async () => {
  try {
    const webookDBConnection = await require('../models')();
    if (!webookDBConnection) throw new Error('Failed to connect to database');
    return webookDBConnection;
  } catch (error) {
    log.error('Error in catch! ', error);
    return null;
  }
};
