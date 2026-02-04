const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middlewares/authMiddleware');
const { getUsers } = require('../controllers/userController');
const { getOwnerDashboard } = require('../controllers/dashboardController');

// verify login and authorze role
router.use(protect);
router.use(authorize('STORE_OWNER'));

// get dashboard
router.get('/dashboard', getOwnerDashboard);

// // change password
// router.post('/update-password', changePassword);


module.exports = router;