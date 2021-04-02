const express = require('express');
const router = express.Router();
const controllerUsers = require('../../controllers/usersCntrl');
const guard = require('../../helpers/guard');
const { createAccountLimiter } = require('../../helpers/rateLimit');
const { validateAuth } = require('../../validation/usersVldt');

router
    .post('/register', createAccountLimiter, validateAuth, controllerUsers.registration)
    .post('/login', validateAuth, controllerUsers.login)
    .post('/logout', guard, controllerUsers.logout);

module.exports = router;
