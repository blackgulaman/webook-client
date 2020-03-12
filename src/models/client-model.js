

module.exports = (mongoose, connection) => {
  const schema = new mongoose.Schema(
    {
      gmailId: String,
      email: String,
      username: String,
      password: String,
      firstName: String,
      middleName: String,
      lastName: String,
      gender: String,
      image: String,
      age: Number,
      contactNo: String,
      creationType: String,
      status: String
    },
    { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } }
  );
  return connection.model('Clients', schema);
};
