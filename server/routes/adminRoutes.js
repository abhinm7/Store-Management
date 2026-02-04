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
router.post('/add-user', addUser);
router.get('/get-users', getUsers);

// get store details
router.post('/add-store', addStore);
router.get('/get-stores', getStores);


module.exports = router;