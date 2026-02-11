const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Staff = sequelize.define('Staff', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    }
});

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('present', 'absent', 'leave'),
        defaultValue: 'absent'
    }
});

// Associations
Staff.belongsTo(User, { foreignKey: 'userId', unique: true });
User.hasOne(Staff, { foreignKey: 'userId' });

Staff.hasMany(Attendance, { foreignKey: 'staffId', as: 'attendanceRecords' });
Attendance.belongsTo(Staff, { foreignKey: 'staffId' });

module.exports = { Staff, Attendance };
