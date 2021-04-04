const { UsersRepository } = require('../repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class UserService {
    constructor() {
        this.repositories = {
            users: new UsersRepository(),
        };
    }

    async findUserByEmailServ(email) {
        const user = await this.repositories.users.findUserByEmailRep(email);
        return user;
    }

    async createUserServ(body) {
        const user = await this.repositories.users.createUserRep(body);
        return user;
    }

    async loginAuthService({ email, password }) {
        const user = await this.repositories.users.findUserByEmailRep(email);
        if (!user || !user.validPassword(password)) {
            return null;
        }
        const id = user.id;
        const payload = { id };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });

        await this.repositories.users.updateTokenRep(id, token);

        const data = {
            name: user.name,
            email: user.email,
            subscription: user.subscription,
            token,
        };
        return data;
    }

    async logoutAuthService(id) {
        const resault = await this.repositories.users.updateTokenRep(id, null);
        return resault;
    }

    async updateUserServ(id, body) {
        const data = await this.repositories.users.updateUserRep(id, body);
        return data;
    }
    //for passport use
    async findUserById(id) {
        const user = await this.repositories.users.findUserByIdRep(id);
        return user;
    }
}

module.exports = UserService;
