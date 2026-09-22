const express = require('express');
const { admin } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();
router.get('/stats', admin, dashboardController.getStats);
router.get('/monthly-revenue', admin, dashboardController.getMonthlyRevenue);

module.exports = router;