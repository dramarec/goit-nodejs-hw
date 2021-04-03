const User = require('../schema/userSchema');

class UsersRepository {
    constructor() {
        this.model = User;
    }

    async createUserRep(body) {
        const user = new this.model(body);
        return user.save();
    }

    async findUserByEmail(email) {
        const result = await this.model.findOne({ email });
        return result;
    }

    async findUserById(id) {
        const result = await this.model.findOne({ _id: id });
        return result;
    }

    async updateUser(id, body) {
        const result = await this.model.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
        return result;
    }

    async updateToken(id, token) {
        await this.model.updateOne({ _id: id }, { token });
    }
}

module.exports = UsersRepository;
