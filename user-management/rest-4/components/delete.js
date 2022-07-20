const User = require('../api/models/user-model');

const deleteUser = async (nickname) => {
  return await User.softDelete({ nickname });
};

module.exports = deleteUser;
