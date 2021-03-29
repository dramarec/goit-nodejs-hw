const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite:./data/contacts.db');

sequelize.define('contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
    },
    subscriptions: {
        type: DataTypes.STRING,
        defaultValue: 'free',
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

sequelize.sync();

module.exports = {
    db: sequelize,
    connect: sequelize.authenticate(),
};
