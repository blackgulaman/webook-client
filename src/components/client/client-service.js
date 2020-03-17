const log = require('../../libs/winston')('client/client-service.js');
const clients = require('./client-dal');
const business = require('../business/business-dal');

class Service {
  constructor() {
    this.error = { status: false, message: 'authentication success' };
  }

  async signUp(data) {
    try {
      const newClient = await clients.save({
        firstName: data.firstName,
        lastName: data.lastName,
        emnail: data.email,
        password: data.password
      });
      if (newClient) {
        await business.save({
          clientId: newClient._id,
          name: data.businessName
        });
        return { success: true };
      }
    } catch (catchErr) {
      log.error('Error while signing up the user', catchErr);
      this.error.status = true;
      this.error.message = 'Error while signing up the user';
      return { error: this.error };
    }
  }

  async logout(email) {
    try {
      await clients.update({ email }, { status: false });
      return { sucess: true };
    } catch (catchErr) {
      log.catchErr('Error while checking online status', catchErr);
      this.error.status = true;
      this.error.message = 'Error while checking online status';
      return { error: this.error };
    }
  }

  async checkStatus(email, status) {
    try {
      const isExisting = (await clients.count({ email, status })) > 0;
      if (isExisting) return { status: isExisting };

      // Return error when something happen on checking client status
      log.error('Failed to save the new client ', { email, status });
      this.error.status = true;
      this.error.message = 'Error on gmail authentication';
      return { error: this.error };
    } catch (catchErr) {
      log.catchErr('Error while checking online status', catchErr);
      this.error.status = true;
      this.error.message = 'Error while checking online status';
      return { error: this.error };
    }
  }

  async checkDataValidity(query) {
    try {
      const isExisting = (await clients.count(query)) > 0;
      return { status: isExisting };
    } catch (catchErr) {
      log.catchErr('Error while validating client data', catchErr);
      this.error.status = true;
      this.error.message = 'Error while validating client data';
      return { error: this.error };
    }
  }

  /**
   * This function will authenticate the client
   * @param {Object} auth client credentials
   * @returns {Object} It will return an object of {error, client}
   */
  async authenticate(auth) {
    try {
      switch (auth.loginType) {
        case 'gmail': {
          try {
            const { gmailId, email, firstName, lastName, image } = auth;
            // This query will return a number of document if 0 -> no record, else have.
            const isExisiting = (await clients.count({ gmailId, email })) > 0;
            // return the gmail account if existing.
            if (isExisiting) {
              // Ensure that the existing data is update.
              const user = await clients.update(
                { gmailId, email },
                {
                  email,
                  firstName,
                  lastName,
                  image,
                  status: 'online'
                }
              );
              return { user };
            }

            // Execute when gmail account is not existing create new.
            // Initialize the gmail information
            const gmailInfo = {
              gmailId,
              email,
              firstName,
              lastName,
              image,
              creationType: 'gmail',
              status: 'online'
            };

            // Create new document for gmail
            const newClient = await clients.save(gmailInfo);
            // Return the user without error
            if (newClient.errmsg) return { user: newClient };

            // Return error when something happen on saving client
            log.error('Failed to save the new client ', { auth });
            this.error.status = true;
            this.error.message = 'Error on gmail authentication';
            return { error: this.error };
          } catch (catchErr) {
            log.error('Error in when trying to sign in with gmail ', {
              auth,
              catchErr
            });
            this.error.status = true;
            this.error.message = 'Error on gmail authentication';
            return { error: this.error };
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
      log.error('Error catch when authenticate ', { auth, catchErr });
      this.error.status = true;
      this.error.message = 'Error catch when authenticate';
      return { error: this.error };
    }
  }
}

module.exports = new Service();
