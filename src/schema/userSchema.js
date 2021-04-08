const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;
const { Schema, model } = mongoose;
const gravatar = require('gravatar');

const userSchema = Schema(
    {
        name: {
            type: String,
            default: 'Guest',
            minlength: 2,
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate: {
                validator: function (v) {
                    const reg = /^\S+@\S+\.\S+/;
                    return reg.test(String(v).toLowerCase());
                },
                message: props => `${props.value} is not a valid email!`,
            },
        },
        subscription: {
            type: String,
            enum: {
                values: ['free', 'pro', 'premium'],
                message: "This gender isn't allowed",
            },
            default: 'free',
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 3,
            maxlength: 20,
        },
        token: {
            type: String,
            default: null,
        },
        avatar: {
            type: String,
            default: function () {
                return gravatar.url(this.email, { s: '250' }, true);
            },
        },
        idCloudAvatar: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true },
);
// //? более правельный вариант валидации email:
// userSchema.path('email').validate(function (value) {
//     const reg = /^\S+@\S+\.\S+/;
//     return reg.test(String(value).toLowerCase());
// });

// Шифруем пароль перед сохранением:
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(SALT_FACTOR));
    next();
});
// //* или:
// userSchema.methods.setPassword = async function (password) {
//     this.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR));
// };

// Валидация пароля:
userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
