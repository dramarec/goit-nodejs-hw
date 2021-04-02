const express = require('express');
const router = express.Router();
const controllerUsers = require('../../controllers/usersCntrl');
const guard = require('../../helpers/guard');
const { validateUpdateUser } = require('../../validation/usersVldt');

router.get('/current', guard, controllerUsers.getCurrentUser);
router.patch('/update', guard, validateUpdateUser, controllerUsers.updateUser);

module.exports = router;
