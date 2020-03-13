const log = require('../libs/winston')('/test');

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) return res.sendStatus(403);

    const token = authorization && authorization.split(' ')[1];

    req.token = token;

    next();
  } catch (error) {
    log.error('Error when verifying token! ', error)
  }
}