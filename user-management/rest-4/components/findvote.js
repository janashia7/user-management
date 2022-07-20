const Vote = require('../api/models/vote-model');

const voteExists = async (name, userNickname) => {
  const vote = await Vote.findOne({
    from: name,
    to: userNickname,
  });
  if (vote) {
    return true;
  }
  return false;
};

module.exports = voteExists;
