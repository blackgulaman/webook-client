const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const configs = require('../configs');

module.exports = async ({ app }) => {
  app.use(cors());
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
