const express = require('express');
const router = express.Router();
const controllerUsers = require('../../controllers/users');

router
    .post('/registration', controllerUsers.register)
    .post('/login', controllerUsers.login)
    .post('/logout', controllerUsers.logout);

module.exports = router;
