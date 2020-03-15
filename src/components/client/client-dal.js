const clients = require('./client-model');
const dalHelper = require('../../libs/dal-helper');
const logger = require('../../libs/winston')('client/client-dal');

class Database extends dalHelper {
  constructor() {
    super(clients, logger);
  }
}

module.exports = new Database();
