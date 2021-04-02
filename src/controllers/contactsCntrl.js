const { HttpCode } = require('../helpers/constants');
const { ContactsService } = require('../services');

const contactsService = new ContactsService();

const getAllContactsCntrl = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // console.log('getAllContactsCntrl -> req.query ===>:', req.query);
        const contacts = await contactsService.getAllContactsSrv(userId, req.query);
        res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { ...contacts },
        });
    } catch (err) {
        next(err);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const contact = await contactsService.getContactById(userId, req.params);
        // console.log('req.params :', req.params);
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
        const userId = req.user.id;
        const contact = await contactsService.createContact(userId, req.body);
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
        const userId = req.user.id;
        const contact = await contactsService.updateContact(userId, req.params, req.body);
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
        const userId = req.user.id;
        const contact = await contactsService.updateContact(userId, req.params, req.body);
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
        const userId = req.user.id;
        const contact = await contactsService.removeContact(userId, req.params);
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
    getAllContactsCntrl,
    getContactById,
    createContact,
    updateContact,
    updateContactStatus,
    removeContact,
};
