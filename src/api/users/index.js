const express = require('express');
const router = express.Router();
const controllerUsers = require('../../controllers/usersCntrl');

router
    .post('/registration', controllerUsers.registration)
    .post('/login', controllerUsers.login)
    .post('/logout', controllerUsers.logout);

module.exports = router;
