const business = require('./business-model');
const dalHelper = require('../../libs/dal-helper');
const logger = require('../../libs/winston')('business/business-dal');

class Database extends dalHelper {
  constructor() {
    super(business, logger);
  }
}

module.exports = new Database();
