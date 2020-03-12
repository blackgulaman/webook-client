const log = require('../../libs/winston')('client-controller.js');
const service = require('./client-service');

module.exports = route => {
  route.get('/login', async (req, res) => {
    try {
      const { gmailId, email, firstName, lastName, image } = req.body;
      const newUser = await service.save({ firstName: 'test', lastName: 'test' });
      res.send(newUser);
    } catch (error) {
      log.error('Error in try catch ', error);
    }
  });
};
