const { UsersRepository } = require('../repository');

class UserService {
    constructor() {
        this.repositories = {
            users: new UsersRepository(),
        };
    }

    async createUserServ(body) {
        const user = await this.repositories.users.createUserRep(body);
        return user;
    }

    async findUserByEmail(email) {
        const user = await this.repositories.users.findUserByEmail(email);
        return user;
    }

    async findUserById(id) {
        const user = await this.repositories.users.findUserById(id);
        return user;
    }

    async updateUser(id, body) {
        const data = await this.repositories.users.updateUser(id, body);
        return data;
    }
}

module.exports = UserService;
