const userObject = (model) => {
  const user = model.toObject();

  delete user.password;
  delete user.salt;
  delete user.__v;
  delete user._id;
  delete user.deletedAt;
  delete user.updatedAt;
  delete user.createdAt;

  return user;
};

module.exports = userObject;
