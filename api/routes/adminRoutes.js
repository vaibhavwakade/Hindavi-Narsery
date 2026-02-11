const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware'); // Assuming existing auth middleware
const { isAdmin } = require('../middleware/authMiddleware'); // Assuming existing admin check middleware
const adminController = require('../controllers/adminController');

// Admin-only routes
router.get('/users', authenticateToken, isAdmin, adminController.getAllUsers);
router.get('/users/:id', authenticateToken, isAdmin, adminController.getUserById);
router.put('/users/:id', authenticateToken, isAdmin, adminController.updateUser);
router.delete('/users/:id', authenticateToken, isAdmin, adminController.deleteUser);
router.put('/users/:id/role', authenticateToken, isAdmin, adminController.updateUserRole);
router.get('/orders', authenticateToken, isAdmin, adminController.getAllOrders);

module.exports = router;