const { UsersRepository } = require('../repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const { ErrorHandler } = require('../helpers/errorHandler');

class UserService {
    constructor() {
        this.cloudinary = cloudinary;
        this.cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
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

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });

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

    async findUserById(id) {
        const user = await this.repositories.users.findUserByIdRep(id);
        return user;
    }

    async updateAvatar(id, pathFile) {
        try {
            const { secure_url: avatar, public_id: idCloudAvatar } = await this.#uploadCloud(pathFile);
            const oldAvatar = await this.repositories.users.getAvatarRep(id);
            this.cloudinary.uploader.destroy(oldAvatar.idCloudAvatar, (err, result) => {
                console.log(err, result);
            });
            await this.repositories.users.updateAvatarRep(id, avatar, idCloudAvatar);
            await fs.unlink(pathFile);
            return avatar;
        } catch (error) {
            throw new ErrorHandler(null, 'Error upload avatar');
        }
    }
    #uploadCloud = pathFile => {
        return new Promise((resolve, reject) => {
            this.cloudinary.uploader.upload(
                pathFile,
                {
                    folder: 'Avatars',
                    transformation: {
                        width: 250,
                        crop: 'fill',
                    },
                },
                (error, result) => {
                    console.log(result);
                    if (error) reject(error);
                    if (result) resolve(result);
                },
            );
        });
    };
}

module.exports = UserService;
