const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/authMiddleware');

const admin = require('../middleware/adminMiddleware');

router.post('/', auth, admin, employeeController.createEmployee);
router.get('/', auth, employeeController.getEmployees);
router.put('/:id', auth, admin, employeeController.updateEmployee);
router.delete('/:id', auth, admin, employeeController.deleteEmployee);

module.exports = router;
