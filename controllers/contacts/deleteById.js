const { Contact } = require('../../models/contact');
const { httpError, ctrlWrapper } = require('../../utils');

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw httpError({ status: 404 });
  }
  res.status(200).json(result);
};

module.exports = ctrlWrapper(deleteById);
