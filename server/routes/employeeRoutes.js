const express = require('express');
const router = express.Router();
const { getEmployees, addEmployee, searchEmployees } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getEmployees).post(protect, addEmployee);
router.route('/search').get(protect, searchEmployees);

module.exports = router;
