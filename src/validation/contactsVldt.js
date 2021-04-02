const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const schemaCreateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .required(),
    phone: Joi.string().min(7).max(20).required(),
    // password: Joi.string().min(7).max(20).optional(),
    // subscriptions: Joi.string().min(3).max(10).optional(),
    // token: Joi.string().optional(),
    done: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .optional(),
    phone: Joi.string().min(7).max(20).optional(),
    // password: Joi.string().min(7).max(20).optional(),
    // subscriptions: Joi.string().min(3).max(10).optional(),
    // token: Joi.string().optional(),
    done: Joi.boolean().optional(),
});
const schemaStatusContact = Joi.object({
    done: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
    const { error } = schema.validate(body);
    if (error) {
        const [{ message }] = error.details;
        console.log('validate -> details', error.details);
        return next({
            status: HttpCode.BAD_REQUEST,
            message: `Field: ${message.replace(/"/g, '')}`,
            data: 'Bad Request',
        });
    }
    next();
};

module.exports.validateCreateContact = (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
};
module.exports.validateUpdateContact = (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
};
module.exports.validateUpdateStatusContact = (req, res, next) => {
    return validate(schemaStatusContact, req.body, next);
};
