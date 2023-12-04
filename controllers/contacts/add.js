const { Contact } = require('../../models/contact');
const { ctrlWrapper } = require('../../utils');

const add = async (req, res, next) => {
  const result = await Contact.create({ ...req.body });
  res.status(201).json(result);
};

module.exports = ctrlWrapper(add);
