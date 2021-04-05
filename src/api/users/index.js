const express = require('express');
const router = express.Router();
const usersCntrl = require('../../controllers/usersCntrl');
const guard = require('../../helpers/guard');
const { validateUpdateUser } = require('../../validation/usersVldt');
const upload = require('../../helpers/multer');

router.get('/current', guard, usersCntrl.getCurrentUser);
router.patch('/update', guard, validateUpdateUser, usersCntrl.updateUser);
router.patch('/avatars', guard, upload.single('avatar'), usersCntrl.avatars);

module.exports = router;
