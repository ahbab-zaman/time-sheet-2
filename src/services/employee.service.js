const db = require('../config/sequelize');
const Employee = db.Employee;

exports.createEmployee = async (data) => {
  const {
    employeeId,
    name,
    email,
    department,
    position,
    hourlyRate,
    userId, 
  } = data;

  return await Employee.create({
    employee_id: employeeId,
    user_id: userId,
    name,
    email,
    department,
    position,
    hourly_rate: hourlyRate,
  });
};
