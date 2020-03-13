const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * This prefix will automatically append '/client'
   * for all the routes. ex: https://localhost:9000/client
   */
  apiPrefix: '/client',

  staticFiles: path.join(__dirname, '../../frontend', 'build'),

  bodyParserJSON: { limit: '2mb' },

  bodyParserUrlEncode: { limit: '2mb', extended: true },

  cors: { creditials: true },

  useMongoSession: true,

  sessionMaxAge: 60 * 60 * 24, // 1day

  certificates: {
    key: fs.readFileSync(path.join(__dirname, '../certificates/key.pem')),
    cert: fs.readFileSync(
      path.join(__dirname, '../certificates/certificate.pem')
    )
  }
};
