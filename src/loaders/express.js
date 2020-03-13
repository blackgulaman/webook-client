const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const serveFavicon = require('serve-favicon');
const expressUseragent = require('express-useragent');

const log = require('../libs/winston')('loaders/express.js');
const middlewares = require('../middlewares')

module.exports = async ({ app, configs, cookieParser, expressSession }) => {
  try {
    // Cross origin resources
    app.use(cors({ creditials: true }));

    //Helmet helps you secure your Express apps by setting various HTTP headers. 
    //It's not a silver bullet, but it can help!
    app.use(helmet());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json(configs.express.bodyParserJSON));
    app.use(bodyParser.urlencoded(configs.express.bodyParserUrlEncode));

    // parse application cookie
    app.use(cookieParser);

    // A simple NodeJS/ExpressJS user-agent middleware exposing user-agent details to your application and views
    app.use(expressUseragent.express());

    // A Gzip compression to reduce file sizes before sending them to a web browser. This will reduce latency and lag.
    // the __dirname is the current directory from where the script is running
    app.use(compression());

    // Middleware for session in express
    app.use(expressSession);

    // Logs all the routes that user was trying to access
    app.use(morgan('common'));

    // Middleware for serving the static files
    app.use(express.static(__dirname));

    app.use('/client', require('../components')(app));

    if (process.env.NODE_ENV === 'production') {
      app.use(serveFavicon(path.join(configs.express.staticFiles, 'favicon.ico')));
      app.use(express.static(configs.express.staticFiles));
      // Routes for serving the index.js of react
      app.get('/*', (req, res) => {
        res.sendFile(path.join(configs.express.staticFiles, 'index.html'));
      });
    }
    app.use(middlewares.errorRoutes);
  } catch (error) {
    log.error('Error in catch for express ', error)
  }
};
