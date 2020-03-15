const jwt = require('jsonwebtoken');
const log = require('../libs/winston')('/verify-token.js');
const configs = require('../configs');
module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers['authorization'];
    const token = authorization && authorization.split(' ')[1];

    if (!token) return res.sendStatus(403);
    
    const user = await jwt.verify(token, configs.app.SECRET_TOKEN);
    if (req.session.user && req.session.user.email !== user.user.email) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    log.error('Error when verifying token! ', error);
    return res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
