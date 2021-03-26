const express = require('express');
const router = express.Router();
const controllerContacts = require('../../controllers/contacts');

router
    .get('/', controllerContacts.getAllContacts)
    .get('/:contactId', controllerContacts.getContactById)
    .post('/', controllerContacts.createContact)
    .put('/:contactId', controllerContacts.updateContact)
    .patch('/:contactId/status', controllerContacts.updateContactStatus)
    .delete('/:contactId', controllerContacts.removeContact);

module.exports = router;
