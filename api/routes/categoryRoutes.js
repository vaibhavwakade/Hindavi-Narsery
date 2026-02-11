const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const { validateCategory, validateIdParam } = require('../middleware/validateMiddleware');

router.post('/', authenticateToken, isAdmin, validateCategory, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', validateIdParam, categoryController.getCategoryById);
router.put('/:id', authenticateToken, isAdmin, validateCategory, categoryController.updateCategory);
router.delete('/:id', authenticateToken, isAdmin, validateIdParam, categoryController.deleteCategory);

module.exports = router;
