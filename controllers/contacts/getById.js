const { Contact } = require('../../models/contact');
const { httpError } = require('../../utils');

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });
  if (!result) {
    throw httpError({ status: 404 });
  }
  res.status(200).json(result);
};

module.exports = getById;
