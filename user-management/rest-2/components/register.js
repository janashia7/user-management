const User = require('../api/models/user-model.js');
const hashed = require('./hash');
const userObject = require('./userObject');
const register = async (nickname, firstName, lastName, password) => {
  const availableUser = await User.findOne({ nickname });

  if (availableUser) {
    return null;
  }

  const { hashed: hash, salt } = await hashed(password);

  const user = new User({
    nickname,
    firstName,
    lastName,
    password: hash,
    salt: salt,
  });
  await user.save();
  return userObject(user);
};

module.exports = register;
