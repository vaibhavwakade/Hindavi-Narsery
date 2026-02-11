const User = require('../models/User');
const { Order, OrderItem } = require('../models/Order');
const Product = require('../models/Product');
const { Staff, Attendance } = require('../models/StaffAttendance');
const { Op } = require('sequelize');

// Get all users with optional filtering and pagination
exports.getAllUsers = async (req, res, next) => {
  try {
    const { role, page = 1, limit = 10 } = req.query;
    const whereClause = {};
    if (role) {
      whereClause.role = role; // Filter by role (user or admin)
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      limit: Number(limit),
      offset: Number(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      message: 'Users fetched successfully',
      users,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    next(error);
  }
};

// Get a single user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    res.json({ message: 'User fetched successfully', user });
  } catch (error) {
    console.error('Error fetching user:', error);
    next(error);
  }
};

// Update user details (name, email, role)
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    // Prevent updating own role
    if (req.user.userId === user.id.toString()) { // Sequelize ID is integer usually, but let's be safe with toString logic if comparing with token
      // req.user.userId from token is likely integer if we signed it that way. 
      // If token has integer, user.id is integer. Strict compare fine.
      // But let's cast to String to be safe if types differ.
      if (String(req.user.userId) === String(user.id)) {
        const error = new Error('Cannot update own role');
        error.status = 403;
        throw error;
      }
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) {
      // Check if email is already in use by another user
      const existingUser = await User.findOne({
        where: {
          email,
          id: { [Op.ne]: user.id }
        }
      });
      if (existingUser) {
        const error = new Error('Email already in use');
        error.status = 400;
        throw error;
      }
      user.email = email;
    }
    if (role && ['user', 'admin'].includes(role)) {
      user.role = role;
    }

    await user.save();

    // Return user without password
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({ message: 'User updated successfully', user: userResponse });
  } catch (error) {
    console.error('Error updating user:', error);
    next(error);
  }
};

// Delete a user and their orders
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    // Prevent deleting self
    if (String(req.user.userId) === String(user.id)) {
      const error = new Error('Cannot delete own account');
      error.status = 403;
      throw error;
    }

    // Delete user and their orders
    // Cascade delete handles orders usually if configures, but explicit safer
    // Order.destroy({ where: { userId: user.id } }) // User.hasMany(Order)
    // Sequelize CASCADE on delete usually set up, but let's manual destroy for now or rely on hooks.
    // I didn't set explicit CASCADE in model definition (defaults involved).
    // Let's destroy user, and let foreign keys complain or cascade.
    // Ideally should set `onDelete: 'CASCADE'` in association.
    // For now, explicit destroy orders.
    await Order.destroy({ where: { userId: user.id } });
    await user.destroy();

    res.json({ message: 'User and associated orders deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    next(error);
  }
};

// Get all orders across all users
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const whereClause = {};
    if (status) {
      whereClause.status = status; // Filter by status (pending, confirmed, etc.)
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'productDetails' }]
        },
        { model: User, as: 'userDetails', attributes: ['name', 'email'] }
      ],
      limit: Number(limit),
      offset: Number(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      message: 'Orders fetched successfully',
      orders,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    next(error);
  }
};

// Update user role
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin', "staff", "accountant", "manager"].includes(role)) {
      const error = new Error('Invalid role');
      error.status = 400;
      throw error;
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    // Prevent updating own role
    if (String(req.user.userId) === String(user.id)) {
      const error = new Error('Cannot update own role');
      error.status = 403;
      throw error;
    }

    user.role = role;
    await user.save();

    // If role changed to staff, create a StaffAttendance document if not exists
    if (role === 'staff') {
      const existing = await Staff.findOne({ where: { userId: user.id } });
      if (!existing) {
        await Staff.create({ userId: user.id });
      }
    }

    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({ message: 'User role updated successfully', user: userResponse });
  } catch (error) {
    console.error('Error updating user role:', error);
    next(error);
  }
};