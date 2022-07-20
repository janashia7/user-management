const User = require('../api/models/user-model');
const Vote = require('../api/models/vote-model');

const DURATION = 3600000;

const addVote = async (nickname, userNickname, vote) => {
  const availableUser = await User.findOne({ nickname });

  if (!availableUser) {
    return null;
  }

  const availableProfile = await User.findOne({ nickname: userNickname });
  if (!availableProfile) {
    return null;
  }
  const lastVote = await Vote.findOne({ from: nickname }).sort({
    date: -1,
  });

  if (lastVote && Date.now() - lastVote.date <= DURATION) {
    return null;
  }

  const votes = new Vote({
    from: availableUser.nickname,
    to: availableProfile.nickname,
    vote,
  });
  return await votes.save();
};

module.exports = addVote;
