const db = require('../config/sequelize');
const Leave = db.Leave;

exports.createLeave = async (leaveData) => {
  return await Leave.create(leaveData);
};


exports.getAllLeaves = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return await Leave.findAndCountAll({
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
};

exports.updateLeave = async (id, updateData) => {
  const leave = await Leave.findByPk(id);
  if (!leave) return null;

  await leave.update(updateData);
  return leave;
};

exports.deleteLeave = async (id) => {
  const leave = await Leave.findByPk(id);
  if (!leave) return null;

  await leave.destroy();
  return true;
};