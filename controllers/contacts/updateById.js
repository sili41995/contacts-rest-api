const { Contact } = require('../../models/contact');
const { httpError, ctrlWrapper } = require('../../utils');

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw httpError({ status: 404 });
  }
  res.status(200).json(result);
};

module.exports = ctrlWrapper(updateById);
