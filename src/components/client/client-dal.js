const clients = require('./client-model');
class database {
  find() {}
  async save(data) {
    const client = new clients(data);
    const newClient = client.save();
    return newClient;
  }
}

module.exports = database;
