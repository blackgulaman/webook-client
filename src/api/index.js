const router = require('express').Router();
const login = require('./login');
const configs = require('../configs');

module.exports = app => {
  // Routes when user tries to go to login
  router.get('/login', login);
  router.get('/ping', function (req, res) {
    return res.send('pong');
  });
  return router;
};
