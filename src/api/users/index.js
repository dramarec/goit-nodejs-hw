const express = require('express');
const router = express.Router();
const usersCntrl = require('../../controllers/usersCntrl');
const guard = require('../../helpers/guard');
const { validateUpdateUser } = require('../../validation/usersVldt');

router.get('/current', guard, usersCntrl.getCurrentUser);
router.patch('/update', guard, validateUpdateUser, usersCntrl.updateUser);

module.exports = router;
