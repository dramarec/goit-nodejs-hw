const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const schemaAuthUser = Joi.object({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'ua', 'ru'] },
        })
        .optional(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')).required(),
    subscription: Joi.string().valid('free', 'pro', 'premium').optional(),
});

const schemaUpdateUser = Joi.object({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'ua', 'ru'] },
        })
        .optional(),
    subscription: Joi.string().valid('free', 'pro', 'premium').optional(),
});

const validate = (schema, body, next) => {
    const { error } = schema.validate(body);
    if (error) {
        const [{ message }] = error.details;
        return next({
            status: HttpCode.BAD_REQUEST,
            message: `Field: ${message.replace(/"/g, '')}`,
            data: 'Bad Request',
        });
    }
    next();
};

module.exports.validateAuth = (req, res, next) => {
    return validate(schemaAuthUser, req.body, next);
};

module.exports.validateUpdateUser = (req, res, next) => {
    return validate(schemaUpdateUser, req.body, next);
};
