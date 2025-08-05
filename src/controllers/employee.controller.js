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

exports.getEmployees = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;

    const result = await EmployeeService.fetchEmployees({
      search,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await EmployeeService.updateEmployee(id, req.body);

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EmployeeService.deleteEmployee(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


