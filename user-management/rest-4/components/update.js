const User = require('../api/models/user-model.js');
const hashed = require('../components/hash');
const userObject = require('./userObject');
const update = async (
  nickname,
  firstName,
  lastName,
  password,
  role,
  modified
) => {
  const profile = await User.findOne({ nickname, isDeleted: false });

  if (!profile) {
    return null;
  }
  if (password) {
    const { hashed: hash, salt } = await hashed(password);

    profile.password = hash;
    profile.salt = salt;
  }

  if (modified && new Date(modified) <= profile.updateAt) {
    return null;
  }
  profile.firstName = firstName || profile.firstName;
  profile.lastName = lastName || profile.lastName;
  profile.role = role || profile.role;

  await profile.save();
  return userObject(profile);
};

module.exports = update;
