const log = require('../libs/winston')('mongodb-helper.js');

class mongodbHelper {
  constructor(mongoose, host, options) {
    this.mongoose = mongoose;
    this.host = host;
    this.options = options;
  }

  connect() {
    try {
      const self = this;
      let connection = null;

      connection = this.mongoose.createConnection(self.host, self.options);
      connection.on('connecting', () => {
        log.info('MongoDB is connecting!');
      });

      connection.on('connected', () => {
        log.info('MongoDB is connected!');
      });
      connection.once('open', () => {
        log.info('MongoDB connection opened!');
      });
      connection.on('reconnected', () => {
        log.info('MongoDB reconnected!');
      });
      connection.on('disconnected', async () => {
        log.warn('MongoDB disconnected!');
        connection = self.mongoose.createConnection(self.host, self.options);
      });

      connection.on('error', error => {
        log.error('MongoDB has error!', error);
        self.mongoose.disconnect();
        return false;
      });

      return connection;
    } catch (error) {
      log.error('Error in try catch', error);
    }
  }
}
module.exports = mongodbHelper;
