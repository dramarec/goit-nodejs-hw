const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { ErrorHandler } = require('./helpers/errorHandler');
const { HttpCode } = require('./helpers/constants');
const routerContacts = require('./api/contacts');
const routerUsers = require('./api/users');
const { apiLimit, jsonLimit } = require('./config/rateLimit.json');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: jsonLimit }));

// only apply to requests that begin with /api/
app.use(
    '/api/',
    rateLimit({
        windowMs: apiLimit.windowMs, // 15 minutes
        max: apiLimit.max, // limit each IP to 100 requests per windowMs
        handler: (req, res, next) => {
            next(
                new ErrorHandler(
                    HttpCode.BAD_REQUEST,
                    'Вы исчерпали количество запросов за 15 минут',
                ),
            );
        },
    }),
);

app.use('/api/contacts', routerContacts);
app.use('/api/users', routerUsers);

app.use((req, res, next) => {
    res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: `Use api on routes ${req.baseUrl}/api/contacts`,
        data: 'Not Found',
    });
});

app.use((err, req, res, next) => {
    err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
    res.status(err.status).json({
        status: err.status === 500 ? 'fail' : 'error',
        code: err.status,
        message: err.message,
        data: err.status === 500 ? 'Internal Server Error' : err.data,
    });
});

module.exports = app;
