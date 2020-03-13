const express = require('express');
const connectMongo = require('connect-mongo')
const ExpressSession = require('express-session');
const container = require('typedi').Container;

const log = require('../libs/winston')('loaders/session.js');

module.exports = async ({ configs }) => {
  try {
    // Initialized the session store options
    const sessionStoreOptions = {
      mongooseConnection: container.get('webookDbConnection'),
      collection: 'sessions',
      ttl: configs.express.sessionMaxAge,
      transformId(sessionID) {
        return sessionID;
        // return crypto.createHash('sha1').update(configs.app.saltSettings + sessionID).digest('hex');
      },
    };

    // Connect the express session to mongo store
    const MongoStore = connectMongo(ExpressSession);

    // Select the type of the session
    const sessionStore = (configs.express.useMongoSession) ?
      new MongoStore(sessionStoreOptions) :
      new express.session.MemoryStore();

    const cookieParser = require('cookie-parser')(configs.app.COOKIE_SECRET);


    const expressSession = ExpressSession({
      store: sessionStore,
      cookie: { path: '/', httpOnly: true, secure: (process.env.NODE_ENV === 'production'), maxAge: null },
      rolling: true,
      resave: true,
      saveUninitialized: false,
      secret: configs.app.COOKIE_SECRET,
      key: configs.app.EXPRESS_SID_KEY,
    });

    return { cookieParser, expressSession, sessionStore }
  } catch (error) {
    log.error('Error while initializing sessions! ', error)
  }
}