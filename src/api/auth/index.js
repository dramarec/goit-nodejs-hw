const express = require('express');
const router = express.Router();
const usersCntrl = require('../../controllers/usersCntrl');
const guard = require('../../helpers/guard');
const { createAccountLimiter } = require('../../helpers/rateLimit');
const { validateAuth } = require('../../validation/usersVldt');

router
    .get('/current', guard, usersCntrl.current)

    .post('/register', createAccountLimiter, validateAuth, usersCntrl.registration)
    .post('/login', validateAuth, usersCntrl.login)
    .post('/logout', guard, usersCntrl.logout);

module.exports = router;
