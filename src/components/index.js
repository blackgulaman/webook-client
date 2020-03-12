const router = require('express').Router();
const configs = require('../configs');

module.exports = app => {
  // Routes when user tries to go to login
  require('./client').controller(router);
  router.get('/ping', function(req, res) {
    return res.send('pong');
  });
  return router;
};
