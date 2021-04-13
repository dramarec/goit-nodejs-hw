const { UserService } = require('../services');
const { HttpCode } = require('../helpers/constants');
const userSrvs = new UserService();

const registration = async (req, res, next) => {
    const { email } = req.body;
    const user = await userSrvs.findUserByEmailServ(email);
    if (user) {
        return next({
            status: HttpCode.CONFLICT,
            data: 'Conflict',
            message: 'This email is already use',
        });
    }

    try {
        const newUser = await userSrvs.createUserServ(req.body);
        return res.status(HttpCode.CREATED).json({
            code: HttpCode.CREATED,
            data: {
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    subscription: newUser.subscription,
                    avatar: newUser.avatar,
                    id: newUser.id,
                },
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
                        avatar: result.avatar,
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
                    avatar: user.avatar,
                    subscription: user.subscription,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

const current = async (req, res, next) => {
    try {
        const user = req.user;
        console.log('current ===> user', user);

        const userId = req.user.id;
        console.log('current ===> userId', userId);
        // const user = await userSrvs.getCurrentUser(userId);
        if (user) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    user,
                },
            });
        } else {
            return next({
                status: HttpCode.UNAUTHORIZED,
                message: 'Invalid credentials',
            });
        }
    } catch (e) {
        next(e);
    }
};

const verify = async (req, res, next) => {
    try {
        const result = await userSrvs.verify(req.params);
        if (result) {
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    message: 'Verification successful',
                },
            });
        } else {
            return next({
                status: HttpCode.BAD_REQUEST,
                message: 'Your verification token is not valid. Contact with administration',
            });
        }
    } catch (e) {
        next(e);
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

const avatars = async (req, res, next) => {
    const id = req.user.id;
    const pathFile = req.file.path;

    const url = await userSrvs.updateAvatar(id, pathFile);

    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        avatarUrl: url,
    });
};

module.exports = {
    registration,
    login,
    logout,
    getCurrentUser,
    updateUser,
    avatars,
    verify,
    current,
};
