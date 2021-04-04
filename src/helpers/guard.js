const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('./constants');

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return next({
                status: HttpCode.FORBIDDEN,
                message: 'Forbidden',
            });
        }
        req.user = user;
        // res.locals.user = user переменная на текущем запросе
        // req.app.locals.vars - глобальная переменная
        return next();
    })(req, res, next);
};

// !
// const guard = (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, (err, user) => {
//         const [, token] = req.get('Authorization').split(' ');
//         // const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

//         if (!user || err || token !== user.token) {
//             return res.status(HttpCode.UNAUTHORIZED).json({
//                 status: 'error',
//                 code: HttpCode.UNAUTHORIZED,
//                 data: 'Not authorized',
//                 message: 'Access is denied',
//             });
//         }
//         req.user = user;
//         return next();
//     })(req, res, next);
// };

module.exports = guard;
