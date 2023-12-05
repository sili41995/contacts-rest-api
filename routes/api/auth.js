const express = require('express');
const { signUp, signIn, signOut, current } = require('../../controllers/auth');
const { validateBody, authenticate } = require('../../middlewares');
const { signUpSchema, signInSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validateBody(signUpSchema), signUp);
router.post('/signin', validateBody(signInSchema), signIn);
router.post('/signout', authenticate, signOut);
router.get('/current', authenticate, current);

module.exports = router;
