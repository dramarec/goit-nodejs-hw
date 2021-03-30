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

    async login({ email, password }) {
        const user = await this.repsitories.users.findUserByEmail(email);
        if (!user || !user.validPassword(password)) {
            return null;
        }
        const id = user.id;
        const payload = { id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10m' });
        await this.repsitories.users.updateToken(id, token);
        return token;
    }

    async logout(id) {
        const user = await this.repsitories.users.updateToken(id, null);
        return user;
    }
}

module.exports = AuthService;
