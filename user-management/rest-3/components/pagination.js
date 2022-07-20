const User = require('../api/models/user-model');
const userObject = require('./userObject');

const list = async (page, limit) => {
  const user = await User.find({ isDeleted: false })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  return user.map(userObject);
};

module.exports = list;
