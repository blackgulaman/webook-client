const router = require('express').Router();

module.exports = app => {
  // Routes when user tries to go to login
  require('./client').controller(router);
  require('./token').controller(router);
  router.get('/ping', function(req, res) {
    return res.send('pong');
  });
  router.get('/client', function(req, res) {
    return res.send('pong');
  });
  return router;
};
