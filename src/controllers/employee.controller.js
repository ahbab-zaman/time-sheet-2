const EmployeeService = require('../services/employee.service');


exports.addEmployee = async (req, res) => {
  try {
    const employeeData = {
      ...req.body,
      userId: req.user?.id || 1,
    };

    const newEmployee = await EmployeeService.createEmployee(employeeData);

    res.status(201).json({
      message: 'Employee created successfully',
      employee: newEmployee,
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
