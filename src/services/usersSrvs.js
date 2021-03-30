const { UsersRepository } = require('../repository');

class UserService {
    constructor() {
        this.repsitories = {
            users: new UsersRepository(),
        };
    }

    async createUser(body) {
        const user = await this.repsitories.users.createUser(body);
        return user;
    }

    async findUserByEmail(email) {
        const user = await this.repsitories.users.findUserByEmail(email);
        return user;
    }

    async findUserById(id) {
        const user = await this.repsitories.users.findUserById(id);
        return user;
    }
}

module.exports = UserService;
