const { User } = require('../../models/user');
const { ctrlWrapper, httpError } = require('../../utils');
const bcrypt = require('bcryptjs');
const uploadImage = require('../../utils/uploadImage');

const signUp = async (req, res, next) => {
  const { url: avatar } = await uploadImage(req.file);
  console.log(avatar);
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError({ status: 409, message: 'Email already use' });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    ...req.body,
    avatar,
    password: hashPassword,
  });
  result.password = undefined;
  result.token = undefined;
  res.status(201).json(result);
};

module.exports = ctrlWrapper(signUp);
