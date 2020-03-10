const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const configs = require('../configs');

module.exports = async ({ app }) => {
  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // parse application cookie
  app.use(cookieParser());

  // Logs all the routes that user was trying to access
  app.use(morgan('combined'));

  // the __dirname is the current directory from where the script is running
  app.use(express.static(__dirname));

  app.use('/client', require('../api')(app));
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(configs.express.staticFiles));
    // Routes for serving the index.js of react
    app.get('/*', (req, res) => {
      res.sendFile(path.join(configs.express.staticFiles, 'index.html'));
    });
  }
};
