const userObject = (model) => {
  const user = model.toObject();

  delete user._id;
  delete user.password;
  delete user.salt;
  delete user.__v;

  return user;
};

module.exports = userObject;
