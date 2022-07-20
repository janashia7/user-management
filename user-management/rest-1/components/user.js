const User = require('../api/models/user-model');
const userObject = require('./userObject');

const getUser = async (nickname) => {
  const user = await User.findOne({ nickname });
  if (!nickname) {
    return null;
  }
  return userObject(user);
};

module.exports = getUser;
