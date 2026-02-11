const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_HOST) {
    // Production / Hosting Environment (MySQL)
    const dialectOptions = {
        ssl: process.env.DB_SSL === 'true' ? {
            require: true,
            rejectUnauthorized: false
        } : undefined
    };

    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            port: process.env.DB_PORT || 3306,
            logging: false,
            dialectOptions: dialectOptions
        }
    );
} else {
    // Local Development (SQLite)
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false
    });
}

module.exports = sequelize;
