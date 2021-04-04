const { UserService } = require('../services');
const { HttpCode } = require('../helpers/constants');
const userSrvs = new UserService();

const registration = async (req, res, next) => {
    const { name, email, password, subscription } = req.body;

    const user = await userSrvs.findUserByEmailServ(email);

    if (user) {
        return next({
            status: HttpCode.CONFLICT,
            data: 'Conflict',
            message: 'This email is already use',
        });
    }

    try {
        const newUser = await userSrvs.createUserServ({
            name,
            email,
            subscription,
        });
        return res.status(HttpCode.CREATED).json({
            code: HttpCode.CREATED,
            data: {
                name: newUser.name,
                email: newUser.email,
                subscription: newUser.subscription,
                id: newUser.id,
            },
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const result = await userSrvs.loginAuthService({ email, password });
        if (result) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    token: result.token,
                    user: {
                        name: result.name,
                        email: result.email,
                        subscription: result.subscription,
                    },
                },
            });
        }
        next({
            status: HttpCode.UNAUTHORIZED,
            message: 'Email or password is wrong',
        });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    const id = req.user.id;
    await userSrvs.logoutAuthService(id);
    return res.status(HttpCode.OK).json({
        status: 'No Content',
        code: HttpCode.NO_CONTENT,
        message: 'Logout',
    });
};

const getCurrentUser = async (req, res, next) => {
    try {
        const user = req.user;
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    subscription: user.subscription,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    const id = req.user.id;
    const user = await userSrvs.updateUserServ(id, req.body);
    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
            user: {
                name: user.name,
                email: user.email,
                subscription: user.subscription,
            },
        },
    });
};

module.exports = {
    registration,
    login,
    logout,
    getCurrentUser,
    updateUser,
};
