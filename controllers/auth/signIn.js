const { User } = require('../../models/user');
const { ctrlWrapper, httpError } = require('../../utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValidPassword = await bcrypt.compare(password, user?.password ?? '');

  if (!user || !isValidPassword) {
    throw httpError({ status: 401, message: 'Email or password is wrong' });
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10d' });
  const result = await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token: result.token,
    user: {
      avatar: result.avatar,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
    },
  });
};

module.exports = ctrlWrapper(signIn);
