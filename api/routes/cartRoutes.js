const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateCartItem, validateIdParam } = require('../middleware/validateMiddleware');

router.post('/add', authenticateToken, validateCartItem, cartController.addToCart);
router.get('/', authenticateToken, cartController.getCart);
router.put('/update', authenticateToken, validateCartItem, cartController.updateCartItem);
router.delete('/remove/:id', authenticateToken, validateIdParam, cartController.removeFromCart);
router.delete('/clear', authenticateToken, cartController.clearCart);

module.exports = router;
