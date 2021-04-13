const express = require('express');
const router = express.Router();
const usersCntrl = require('../../controllers/usersCntrl');
const guard = require('../../helpers/guard');
const { validateUpdateUser } = require('../../validation/usersVldt');
const upload = require('../../helpers/multer');

router
    .get('/current', guard, usersCntrl.getCurrentUser)
    .patch('/update', guard, validateUpdateUser, usersCntrl.updateUser)
    .patch('/avatars', guard, upload.single('avatar'), usersCntrl.avatars)
    .get('/verify/:token', usersCntrl.verify);

module.exports = router;
