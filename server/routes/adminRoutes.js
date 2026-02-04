const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getDashboardStats } = require('../controllers/adminController');

router.use(protect);
router.use(authorize('SYSTEM_ADMIN')); 

router.get('/dashboard', getDashboardStats);

module.exports = router;