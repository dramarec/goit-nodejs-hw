const { AuthService, UserService } = require('../services');
const { HttpCode } = require('../helpers/constants');
const serviceUser = new UserService();
const serviceAuth = new AuthService();

const registration = async (req, res, next) => {
    console.log('req.body :', req.body);
    const { name, email, password, subscriptions } = req.body;
    const user = await serviceUser.findUserByEmail(email);
    if (user) {
        return next({
            status: 'error',
            code: HttpCode.CONFLICT,
            data: 'Conflict',
            message: 'This email is already use',
        });
    }
    try {
        const newUser = await serviceUser.createUser({
            name,
            email,
            password,
            subscriptions,
        });

        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
                subscriptions: newUser.subscriptions,
            },
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await serviceAuth.login({ email, password });
        if (token) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    token,
                },
            });
        }
        next({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Invalid creadentials',
        });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    const id = req.user.id;
    await serviceAuth.logout(id);
    return res.status(HttpCode.NO_CONTENT).json({
        status: 'success',
        code: HttpCode.NO_CONTENT,
    });
};

module.exports = { registration, login, logout };
