const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const { validateProduct, validateIdParam } = require('../middleware/validateMiddleware');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authenticateToken, isAdmin, upload.array('images', 5), validateProduct, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', validateIdParam, productController.getProductById);
router.put('/:id', authenticateToken, isAdmin, upload.array('images', 5), validateProduct, productController.updateProduct);
router.delete('/:id', authenticateToken, isAdmin, validateIdParam, productController.deleteProduct);

module.exports = router;
