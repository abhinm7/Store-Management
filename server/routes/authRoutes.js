const express = require('express');
const { login, signup, changePassword } = require('../controllers/authController');
const { authorize, protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// authentication
router.post('/login', login);
router.post('/signup', signup);

// change password
router.post('/update-password', protect, authorize('STORE_OWNER', 'NORMAL'), changePassword);

module.exports = router;