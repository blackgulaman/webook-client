const log = require('../libs/winston')('api/login.js');

module.exports = async (req, res) => {
  try {
    const { clients } = await require('../models')();
    const newModel = new clients({
      email: 'test',
      username: 'test',
      password: 'test'
    });
    const unewUser = await newModel.save();
    res.send(unewUser);
  } catch (error) {
    log.error('Error in try catch ', error);
  }
};
