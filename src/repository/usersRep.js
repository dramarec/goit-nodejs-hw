const User = require('../schema/userSchema');

class UsersRepository {
    constructor() {
        this.model = User;
    }

    async findUserByEmailRep(email) {
        const result = await this.model.findOne({ email });
        return result;
    }

    async createUserRep(body) {
        const user = new this.model(body);
        return user.save();
    }

    async updateTokenRep(id, token) {
        await this.model.updateOne({ _id: id }, { token });
    }

    async updateUserRep(id, body) {
        const result = await this.model.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
        return result;
    }
    //for passport use
    async findUserByIdRep(id) {
        const result = await this.model.findOne({ _id: id });
        return result;
    }

    async findByField(field) {
        const result = await this.model.findOne(field);
        return result;
    }

    async updateAvatarRep(id, avatar, idCloudAvatar) {
        await this.model.updateOne({ _id: id }, { avatar, idCloudAvatar });
    }

    async getAvatarRep(id) {
        const { avatar, idCloudAvatar } = await this.model.findOne({ _id: id });
        return { avatar, idCloudAvatar };
    }

    async getCurrentUser(id) {
        const user = await this.model.findOne({ _id: id } /* , '_id name email sex avatar createdAt' */);
        return user;
    }
}

module.exports = UsersRepository;
