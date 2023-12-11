const express = require('express');
const {
  add,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const {
  addSchema,
  updateSchema,
  updateStatusContactSchema,
} = require('../../models/contact');

const router = express.Router();

router.use(authenticate);

router.get('/', getAll);
router.get('/:contactId', isValidId, getById);
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
