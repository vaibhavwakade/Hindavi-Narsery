const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TempUser = sequelize.define('TempUser', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING
    },
    otp: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    // Note: MySQL doesn't builtin equivalent of Mongo's TTL index for automatic deletion.
    // We'd need a scheduled cron job to clean up old records, or just check expiration on usage.
});

module.exports = TempUser;
