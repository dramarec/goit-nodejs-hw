const express = require('express');
const router = express.Router();
const controllerUsers = require('../../controllers/usersCntrl');
const guard = require('../../helpers/guard');

router
    .post('/registration', controllerUsers.registration)
    .post('/login', controllerUsers.login)
    .post('/logout', guard, controllerUsers.logout);

module.exports = router;
