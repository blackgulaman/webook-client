const log = require('../libs/winston')('middlewares/error-route.js');

module.exports = (req, res, next) => {
    // log.error('Error while requesting on routes! ', { method: req.method, url: req.url });
    if (req.accepts('html')) return res.send({ error: 'Not found' });
    // respond with json
    if (req.accepts('json')) return res.send({ error: 'Not found' });
    next();
}