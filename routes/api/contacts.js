const express = require('express');
const {
  add,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const { addSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', getAll);
router.get('/:contactId', getById);
router.post('/', validateBody(addSchema), add);
router.delete('/:contactId', deleteById);
router.put('/:contactId', updateById);
// router.patch('/:contactId/favorite', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

module.exports = router;
