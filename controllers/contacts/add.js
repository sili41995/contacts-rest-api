const { Contact } = require('../../models/contact');
const { ctrlWrapper } = require('../../utils');

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  result.owner = undefined;
  res.status(201).json(result);
};

module.exports = ctrlWrapper(add);
