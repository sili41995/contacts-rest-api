const { Contact } = require('../../models/contact');
const { httpError, ctrlWrapper } = require('../../utils');

const updateById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  ).select('-updatedAt -createdAt -owner');
  if (!result) {
    throw httpError({ status: 404 });
  }
  res.status(200).json(result);
};

module.exports = ctrlWrapper(updateById);
