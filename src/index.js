require('dotenv/config');

(async () => {
  // Imports all the modules that is needed
  const express = require('express');
  const app = express();
  const log = require('./libs/winston')('app.js');
  const configs = require('./configs');

  // Initialize the service to be run
  const server = configs.app.isHttp
    ? require('http').Server(app)
    : require('https').createServer(configs.express.certificates, app);

  // Load all the modules and configurations
  await require('./loaders')({ app, server });

  // It will run now the server with dedicated port
  server.listen(configs.app.port, error => {
    if (error) {
      log.error('Error running the service!');
      throw new Error('Error running the service!');
    } else {
      log.info(`Service is now running!`, { port: configs.app.port });
    }
  });
})();
