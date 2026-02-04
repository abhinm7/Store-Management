const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getDashboardStats, addUser, getUsers } = require('../controllers/adminController');

router.use(protect);
router.use(authorize('SYSTEM_ADMIN'));

router.get('/dashboard', getDashboardStats);
router.post('/add-user', addUser);
router.get('/get-users', getUsers);


module.exports = router;