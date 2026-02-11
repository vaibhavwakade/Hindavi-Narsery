const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageUrls: {
    type: DataTypes.JSON, // Store array of strings as JSON
    defaultValue: []
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'categoryDetails' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product;