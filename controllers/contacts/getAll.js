const { Contact } = require('../../models/contact');
const { ctrlWrapper } = require('../../utils');

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };

  if (favorite === 'false' || favorite === 'true') {
    filter.favorite = favorite;
  }

  const result = await Contact.find(filter, '-updatedAt -createdAt -owner', {
    skip,
    limit,
  });
  const count = await Contact.find({ owner }).countDocuments();
  res.status(200).json({
    contacts: result,
    count,
  });
};

module.exports = ctrlWrapper(getAll);
