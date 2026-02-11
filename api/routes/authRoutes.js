const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { 
  validateUserSignup, 
  validateUserLogin, 
  validateUserUpdate, 
  validatePasswordChange 
} = require('../middleware/validateMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/signup', validateUserSignup, authController.signup);
router.post('/login', validateUserLogin, authController.login);
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, validateUserUpdate, authController.updateProfile);
router.put('/password', authenticateToken, validatePasswordChange, authController.changePassword);

module.exports = router;