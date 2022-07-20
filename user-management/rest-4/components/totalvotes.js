const Vote = require('../api/models/vote-model');

const totalVotes = async (userNickname) => {
  const availableUser = await Vote.find({ to: userNickname });
  if (!availableUser) {
    return null;
  }

  const sum = availableUser.reduce((total, curr) => (total += curr.vote), 0);
  return sum;
};

module.exports = totalVotes;
