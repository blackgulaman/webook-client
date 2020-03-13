const log = require('../../libs/winston')('client/client-service.js');
const clients = require('./client-dal');

class Service {
  /**
   * This function will authenticate the client
   * @param {Object} auth client credentials
   * @returns {Object} It will return an object of {error, client}
   */
  async authenticate(auth) {
    const error = { status: false, message: 'authentication success' };
    try {
      switch (auth.loginType) {
        case 'gmail': {
          try {
            const { gmailId, email, firstName, lastName, image } = auth;
            // This query will return a number of document if 0 -> no record, else have.
            const isExisiting = await clients.count({ gmailId, email }) > 0;
            // return the gmail account if existing.
            if (isExisiting) {
              // Ensure that the existing data is update. 
              const client = await clients.update({ gmailId, email }, {
                email,
                firstName,
                lastName,
                image,
              });
              return { error, client };
            }

            // Execute when gmail account is not existing create new.
            // Initialize the gmail information
            const gmailInfo = { gmailId, email, firstName, lastName, image, creationType: 'gmail' };

            // Create new document for gmail
            const newClient = await clients.save(gmailInfo);
            // Return the client without error
            if (!newClient.errmsg) return { error, client: newClient };

            // Return error when something happen on saving client
            log.error('Failed to save the new client! ', { auth })
            error.status = true;
            error.message = 'Error on gmail authentication!'
            return { error };
          } catch (catchErr) {
            log.error('Error in when trying to sign in with gmail! ', { auth, catchErr })
            error.status = true;
            error.message = 'Error on gmail authentication!'
            return { error };
          }
        }
        case 'facebook': {
          break;
        }
        case 'webook': {
          break;
        }
        default:
          break;
      }

    } catch (catchErr) {
      log.error('Error catch when authenticate! ', { auth, catchErr })
      error.status = true;
      error.message = 'Error catch when authenticate!'
      return { error };
    }
  }

  async signOut() {

  }
}

module.exports = new Service();
