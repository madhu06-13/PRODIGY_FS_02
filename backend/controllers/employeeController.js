const Employee = require('../models/Employee');

// @route   POST api/employees
// @desc    Create a new employee
// @access  Private
exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        const employee = await newEmployee.save();
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/employees
// @desc    Get all employees
// @access  Private
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ dateOfJoining: -1 });
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT api/employees/:id
// @desc    Update employee
// @access  Private
exports.updateEmployee = async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        employee = await Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE api/employees/:id
// @desc    Delete employee
// @access  Private
exports.deleteEmployee = async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        await Employee.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
