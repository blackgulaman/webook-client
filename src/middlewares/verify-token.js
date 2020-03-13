const log = require('../libs/winston')('middlewares/verify-token.js');

module.exports = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) return res.sendStatus(403);

    const token = authorization && authorization.split(' ')[1];

    req.token = token;

    next();
}