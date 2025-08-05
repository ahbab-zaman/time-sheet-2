const db = require('../config/sequelize');
const Employee = db.Employee;
const { Op } = require('sequelize');


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

exports.fetchEmployees = async ({ search, page, limit }) => {
  const offset = (page - 1) * limit;

  const whereClause = search
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      }
    : {};

  const { rows: employees, count: total } = await Employee.findAndCountAll({
    where: whereClause,
    offset,
    limit,
    order: [['created_at', 'DESC']],
  });

  return {
    total,
    page,
    limit,
    employees,
  };
};

exports.updateEmployee = async (id, updates) => {
  const employee = await Employee.findByPk(id);
  if (!employee) return null;

  await employee.update(updates);
  return employee;
};

exports.deleteEmployee = async (id) => {
  const deletedCount = await Employee.destroy({ where: { id } });
  return deletedCount > 0;
};
