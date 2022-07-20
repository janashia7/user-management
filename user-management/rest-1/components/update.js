const User = require('../api/models/user-model.js');
const hashed = require('../components/hash');
const userObject = require('./userObject');

const update = async (nickname, firstName, lastName, password) => {
  const profile = await User.findOne({ nickname });

  if (!profile) {
    return null;
  }
  if (password) {
    const { hashed: hash, salt } = await hashed(password);

    profile.password = hash;
    profile.salt = salt;
  }

  profile.firstName = firstName || profile.firstName;
  profile.lastName = lastName || profile.lastName;

  await profile.save();
  return userObject(profile);
};

module.exports = update;
