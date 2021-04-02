const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        subscriptions: {
            type: String,
            enum: {
                values: ['free', 'pro', 'premium'],
                message: "This gender isn't allowed",
            },
            default: 'free',
        },
        name: {
            type: String,
            default: 'Guest',
            minlength: 2,
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
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            // //* вариант валидации email:
            // validate(value) {
            //     const reg = /\S+@\S+\.\S+/;
            //     return reg.test(String(value).toLowerCase());
            // },
        },
    },
    { versionKey: false, timestamps: true },
);
// //? более правельный вариант валидации email:
userSchema.path('email').validate(function (value) {
    const reg = /^\S+@\S+\.\S+/;
    return reg.test(String(value).toLowerCase());
});

// Шифруем пароль перед сохранением:
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(
        this.password,
        bcrypt.genSaltSync(SALT_FACTOR),
    );
    next();
});
// //* или:
// userSchema.methods.setPassword = async function (password) {
//     this.password = await bcrypt.hashSync(
//         password,
//         bcrypt.genSaltSync(SALT_FACTOR),
//     );
// };

// Валидация пароля:
userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
