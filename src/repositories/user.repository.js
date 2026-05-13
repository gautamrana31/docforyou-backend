const User = require('../models/user.model');

async function createUser(user) {
  return User.create(user);
}

async function findUserByEmail(email, options = {}) {
  const query = User.findOne({ email: email.toLowerCase() });

  if (options.includePassword) {
    query.select('+passwordHash');
  }

  return query;
}

async function findUserById(id) {
  return User.findById(id);
}

async function findUserByMobileNumber(mobileNumber) {
  return User.findOne({ mobileNumber });
}

async function findDoctors() {
  return User.find({ userType: 'doctor' }).sort({ createdAt: -1 });
}

async function findDoctorById(id) {
  return User.findOne({
    _id: id,
    userType: 'doctor',
  });
}

async function updateUser(id, updates) {
  return User.findByIdAndUpdate(id, updates, {
    returnDocument: 'after',
    runValidators: true,
  });
}

module.exports = {
  createUser,
  findDoctorById,
  findDoctors,
  findUserByEmail,
  findUserById,
  findUserByMobileNumber,
  updateUser,
};
