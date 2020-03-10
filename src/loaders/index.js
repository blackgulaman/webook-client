const log = require('../libs/winston')('loader/index.js');
module.exports = async ({ app, server }) => {
  await require('./mongodb')();
  log.info('MongoDB is now initialized!');
  await require('./express')({ app });
  log.info('Express configuration is successfully loaded!');

  await require('./socket-io')({ app, server });
  log.info('Socket.io configuration is successfully loaded!');
};
