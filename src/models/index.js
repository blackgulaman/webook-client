const log = require('../libs/winston')('model/clients/index.js');

module.exports = async () => {
  try {
    const connection = await require('../loaders/mongodb')();
    const clients = require('./client-model')(connection);
    return { clients };
  } catch (error) {
    log.error('Error in try catch! ', error);
  }
};
