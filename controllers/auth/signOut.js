const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../utils');

const signOut = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });

  res.status(204).json();
};

module.exports = ctrlWrapper(signOut);
