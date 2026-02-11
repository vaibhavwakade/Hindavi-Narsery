const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// Associations
Review.belongsTo(User, { foreignKey: 'userId', as: 'userDetails' });
User.hasMany(Review, { foreignKey: 'userId' });

Review.belongsTo(Product, { foreignKey: 'productId', as: 'productDetails' });
Product.hasMany(Review, { foreignKey: 'productId' });

module.exports = Review;
