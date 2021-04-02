const express = require('express');
const router = express.Router();
const controllerContacts = require('../../controllers/contactsCntrl');
const {
    validateCreateContact,
    validateUpdateContact,
    validateUpdateStatusContact,
} = require('../../validation/contactsVldt');
const guard = require('../../helpers/guard');

router
    .get('/', guard, controllerContacts.getAllContactsCntrl)
    .get('/:contactId', guard, controllerContacts.getContactById)
    .post('/', guard, validateCreateContact, controllerContacts.createContact)
    .put(
        '/:contactId',
        guard,
        validateUpdateContact,
        controllerContacts.updateContact,
    )
    .patch(
        '/:contactId/status',
        guard,
        validateUpdateStatusContact,
        controllerContacts.updateContactStatus,
    )
    .delete('/:contactId', guard, controllerContacts.removeContact);

module.exports = router;
