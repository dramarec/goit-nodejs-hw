const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: 2,
            maxlength: 22,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, 'User phone number required'],
            validate: {
                validator: function (v) {
                    return /^\(?[0][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(v);
                },
                message: props => `${props.value}! Please try (044)123-45-67`,
            },
            unique: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
        },
    },
    { versionKey: false, timestamps: true },
);
contactSchema.plugin(mongoosePaginate);

const Contact = model('contact', contactSchema);

module.exports = Contact;
