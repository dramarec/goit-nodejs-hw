const { HttpCode } = require('../helpers/constants');
const { ContactsService } = require('../services');

const contactsService = new ContactsService();

const getAllContacts = (_, res, next) => {
    try {
        const contacts = contactsService.getAllContacts();
        res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { contacts },
        });
    } catch (err) {
        next(err);
    }
};
const getContactById = (req, res, next) => {
    try {
        const contact = contactsService.getContactById(req.params);
        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: { contact },
            });
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: 'Not found contact',
                data: 'Not found',
            });
        }
    } catch (err) {
        next(err);
    }
};
const createContact = (req, res, next) => {
    try {
        const contact = contactsService.createContact(req.body);
        res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: { contact },
        });
    } catch (err) {
        next(err);
    }
};
const updateContact = (req, res, next) => {
    try {
        const contact = contactsService.updateContact(
            req.params.contactId,
            req.body,
        );
        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: { contact },
            });
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: 'Not found contact',
                data: 'Not found',
            });
        }
    } catch (err) {
        next(err);
    }
};
const updateContactStatus = (req, res, next) => {
    try {
        const contact = contactsService.updateContactStatus(
            req.params,
            req.body,
        );
        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: { contact },
            });
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: 'Not found contact',
                data: 'Not found',
            });
        }
    } catch (err) {
        next(err);
    }
};
const removeContact = (req, res, next) => {
    try {
        const contact = contactsService.removeContact(req.params);
        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: { contact },
            });
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: 'Not found contact',
                data: 'Not found',
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    updateContactStatus,
    removeContact,
};
