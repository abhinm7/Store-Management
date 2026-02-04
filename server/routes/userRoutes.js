const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middlewares/authMiddleware');
const { getStores, submitRating } = require('../controllers/storeController');

// verify login and authorze role
router.use(protect);
router.use(authorize('NORMAL'));

// get store details
router.get('/get-stores', getStores);

// submit rating
router.post('/submit-rating', submitRating);

module.exports = router;