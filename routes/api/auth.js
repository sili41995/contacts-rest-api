const express = require('express');
const { signUp, signIn } = require('../../controllers/auth');
const validateBody = require('../../middlewares/validateBody');
const { signUpSchema, signInSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validateBody(signUpSchema), signUp);
router.post('/signin', validateBody(signInSchema), signIn);

module.exports = router;
