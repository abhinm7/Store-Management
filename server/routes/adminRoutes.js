const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getDashboardStats, addUser, getUsers, addStore, getStores } = require('../controllers/adminController');

router.use(protect);
router.use(authorize('SYSTEM_ADMIN'));

router.get('/dashboard', getDashboardStats);

// get user details
router.post('/add-user', addUser);
router.get('/get-users', getUsers);

// get store details
router.post('/add-store', addStore);
router.get('/get-stores', getStores);


module.exports = router;