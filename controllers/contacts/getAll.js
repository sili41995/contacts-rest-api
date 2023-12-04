const { Contact } = require('../../models/contact');
const { ctrlWrapper } = require('../../utils');

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

module.exports = ctrlWrapper(getAll);
