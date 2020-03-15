const jwt = require('jsonwebtoken');
const log = require('../../libs/winston')('client/client-controller.js');
const { verifyToken } = require('../../middlewares');
const service = require('./client-service');
const configs = require('../../configs');

module.exports = route => {
  route.post('/signin', async (req, res) => {
    try {
      if (!req.body.loginType) return res.send('Invalid parameter!');
      const { error, user } = await service.authenticate(req.body);
      // Return if the authentication is failed.
      if (error) return res.send({ error });
      req.session.user = user;
      req.session.save();

      const token = await jwt.sign(
        { user },
        configs.app.SECRET_TOKEN,
        configs.app.SECRET_TOKEN_OPT
      );
      const refreshToken = await jwt.sign(
        { user },
        configs.app.REFRESH_SECRET_TOKEN,
        configs.app.REFRESH_SECRET_TOKEN_OPT
      );
      return res.send({ error, user, token, refreshToken });
    } catch (error) {
      log.error('Error in login try catch ', error);
      return res.sendStatus(404);
    }
  });

  route.post('/signout', async (req, res) => {
    try {
      console.log(req.body);
      const { success } = await service.logout(req.body.email);
      console.log(success);
      if (!success) return res.sendStatus(500);
      res.send('success');
    } catch (error) {
      log.error('Error in signup try catch ', error);
    }
  });
  route.post('/signup', verifyToken, async (req, res) => {
    try {
      // const { gmailId, email, firstName, lastName, image } = req.body;
      // const newUser = await service.signIn()
      // res.send(newUser);
      res.send('success');
    } catch (error) {
      log.error('Error in signup try catch ', error);
    }
  });

  route.post('/check-online-status', verifyToken, async (req, res) => {
    try {
      console.log(req.body);
      const { error, status } = await service.checkStatus(
        req.body.email,
        'online'
      );
      if (error) return res.send({ error });
      return res.send({ status });
    } catch (error) {
      log.error('Error in check-online-status try catch ', error);
    }
  });
};
