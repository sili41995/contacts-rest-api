const { Contact } = require('../../models/contact');
const { ctrlWrapper, getFindFilter } = require('../../utils');

const filter = '-updatedAt -createdAt -owner -role -description -tgUsername';

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { skip, limit, findFilter } = getFindFilter({
    owner,
    query: req.query,
  });
  const result = await Contact.find(findFilter, filter, {
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
