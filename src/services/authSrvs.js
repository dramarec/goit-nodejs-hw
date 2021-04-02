const { UsersRepository } = require('../repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
    constructor() {
        this.repsitories = {
            users: new UsersRepository(),
        };
    }

    async loginAuthService({ email, password }) {
        const user = await this.repsitories.users.findUserByEmail(email);
        if (!user || !user.validPassword(password)) {
            return null;
        }
        const id = user.id;
        const payload = { id };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });

        await this.repsitories.users.updateToken(id, token);

        const data = {
            name: user.name,
            email: user.email,
            subscription: user.subscription,
            token,
        };
        return data;
    }

    async logoutAuthService(id) {
        const loguser = await this.repsitories.users.updateToken(id);
        return loguser;
    }
}

module.exports = AuthService;
