const database = require('./client-dal');

class ClientService extends database {
  async signIn() {}
  async signOut() {}
}

module.exports = new ClientService();
