const { HttpCode } = require('../helpers/constants');
const { ContactsService } = require('../services');

const contactsService = new ContactsService();

const getAllContacts = async (_, res, next) => {
    try {
        const contacts = await contactsService.getAllContacts();
        res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { contacts },
        });
    } catch (err) {
        next(err);
    }
};
const getContactById = async (req, res, next) => {
    try {
        const contact = await contactsService.getContactById(req.params);
        console.log('req.params :', req.params);
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
const createContact = async (req, res, next) => {
    try {
        const contact = await contactsService.createContact(req.body);
        res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: { contact },
        });
    } catch (err) {
        next(err);
    }
};
const updateContact = async (req, res, next) => {
    try {
        const contact = await contactsService.updateContact(
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
const updateContactStatus = async (req, res, next) => {
    try {
        const contact = await contactsService.updateContact(
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
const removeContact = async (req, res, next) => {
    try {
        const contact = await contactsService.removeContact(req.params);
        if (contact) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                message: 'Contact deleted',
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
