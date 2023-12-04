const express = require('express');
const {
  add,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const {
  addSchema,
  updateSchema,
  updateStatusContactSchema,
} = require('../../models/contact');

const router = express.Router();

router.get('/', getAll);
router.get('/:contactId', getById);
router.post('/', validateBody(addSchema), add);
router.delete('/:contactId', isValidId, deleteById);
router.put('/:contactId', isValidId, validateBody(updateSchema), updateById);
router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateStatusContactSchema),
  updateById
);

module.exports = router;
