module.exports = (mongoose, connection) => {
  const schema = new mongoose.Schema(
    {
      email: String,
      username: String,
      password: String,
      firstName: String,
      middleName: String,
      lastName: String,
      gender: String,
      age: Number,
      ContactNo: String,
      CreationType: String,
      Status: String
    },
    { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } }
  );
  return connection.model('Clients', schema);
};
