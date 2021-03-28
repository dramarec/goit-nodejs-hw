const express = require('express');
const router = express.Router();
const controllerContacts = require('../../controllers/contacts');
const {
    validateCreateContact,
    validateUpdateContact,
    validateUpdateStatusContact,
} = require('../../validation/contacts');
router
    .get('/', controllerContacts.getAllContacts)
    .get('/:contactId', controllerContacts.getContactById)
    .post('/', validateCreateContact, controllerContacts.createContact)
    .put('/:contactId', validateUpdateContact, controllerContacts.updateContact)
    .patch(
        '/:contactId/status',
        validateUpdateStatusContact,
        controllerContacts.updateContactStatus,
    )
    .delete('/:contactId', controllerContacts.removeContact);

module.exports = router;
