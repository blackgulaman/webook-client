const jwt = require('jsonwebtoken');
const log = require('../../libs/winston')('client/client-controller.js');
const { verifyToken } = require('../../middlewares');
const service = require('./client-service');

module.exports = route => {
  route.post('/signin', async (req, res) => {
    try {
      if (!req.body.loginType) return res.send('Invalid parameter!');
      const { error, client } = await service.authenticate(req.body);
      // Return if the authentication is failed.
      if (error.status) return res.send({ error })
      req.session.client = client;
      res.send({ error, client });
    } catch (error) {
      log.error('Error in try catch ', error);
    }
  });

  route.post('/signup', async (req, res) => {
    try {
      // const { gmailId, email, firstName, lastName, image } = req.body;
      // const newUser = await service.signIn()
      // res.send(newUser);
      res.send(req.session.user)
    } catch (error) {
      log.error('Error in try catch ', error);
    }
  });

  route.post('/test', verifyToken, async (req, res) => {
    res.sendStatus(200);
  })
  route.post('/login', async (req, res) => {
    const token = await jwt.sign({ user: 'test' }, 'secreeeettee');
    log.error('Error in try catch ', token);
    res.sendStatus(200);
  })
};
