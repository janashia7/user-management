const Vote = require('../api/models/vote-model');
const userObject = require('./userObject');

const updateVotes = async (nickname, userNickname, votes) => {
  const availableUser = await Vote.findOne({
    from: nickname,
    to: userNickname,
  });
  if (!availableUser) {
    return null;
  }
  availableUser.vote = votes;

  await availableUser.save();
  return await userObject(availableUser);
};

module.exports = updateVotes;
