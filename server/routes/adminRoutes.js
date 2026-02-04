const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middlewares/authMiddleware');
const { addUser, getUsers } = require('../controllers/userController');
const { addStore, getStores } = require('../controllers/storeController');
const { getDashboardStats } = require('../controllers/dashboardController');

// verify login and authorze role
router.use(protect);
router.use(authorize('SYSTEM_ADMIN'));

// get dasboard stats
router.get('/dashboard-stats', getDashboardStats);

// get user details
router.post('/user', addUser);
router.get('/users', getUsers);

// get store details
router.post('/store', addStore);
router.get('/stores', getStores);


module.exports = router;