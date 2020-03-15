const log = require('../libs/winston')('loader/index.js');
module.exports = async ({ app, server, configs }) => {
  // Load the mongo db connection
  await require('./mongodb')();
  log.info('MongoDB is now initialized!');

  // Load the sessions
  const {
    expressSession,
    cookieParser,
    sessionStore
  } = await require('./session')({ app, configs });
  log.info('Session is successfully loaded!');

  // Load the express setup
  await require('./express')({ app, configs, expressSession, cookieParser });
  log.info('Express is successfully loaded!');

  await require('./socket-io')({ server });
  log.info('Socket.io is successfully loaded!');
};
