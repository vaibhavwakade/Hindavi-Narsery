const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const { validateIdParam } = require('../middleware/validateMiddleware');

router.post('/', authenticateToken, orderController.createOrder);
router.get('/', authenticateToken, orderController.getOrders);
router.get('/:id', authenticateToken, validateIdParam, orderController.getOrderById);
router.put('/cancel/:id', authenticateToken, validateIdParam, orderController.cancelOrder);
router.put('/status/:id', authenticateToken, isAdmin, validateIdParam, orderController.updateOrderStatus);
router.put('/pay/:id', authenticateToken, validateIdParam, orderController.updatePaymentStatus);

module.exports = router;