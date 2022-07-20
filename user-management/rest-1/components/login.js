const User = require('../api/models/user-model.js');
const hashed = require('../components/hash');
const logger = require('./logger.js');
const userObject = require('./userObject');

const login = async (nickname, password) => {
  const profile = await User.findOne({ nickname });
  if (!profile) {
    return null;
  }
  logger.info(profile);

  const { hashed: hash, salt } = await hashed(password, profile.salt);

  logger.info(hash, profile.password);
  if (hash === profile.password) {
    logger.info(profile);
    return userObject(profile);
  } else {
    return null;
  }
};

module.exports = login;
