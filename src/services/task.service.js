const db = require('../config/sequelize');
const Task = db.Task;
// const { Op } = require('sequelize');


exports.createTask = async (taskData) => {
  const {
    project_id,
    employee_id,
    title,
    description,
    estimated_hours,
    start_date,
    due_date,
  } = taskData;

  // Optional: validate required fields
  if (!employee_id || !title) {
    throw new Error("employee_id and title are required");
  }

  const newTask = await Task.create({
    project_id,
    employee_id,
    title,
    description,
    estimated_hours,
    start_date,
    due_date,
  });

  return newTask;
};

exports.getTasks = async (page = 1) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Task.findAndCountAll({
    limit,
    offset,
    order: [['created_at', 'DESC']],
  });

  return {
    total: count,
    page,
    pageSize: limit,
    tasks: rows,
  };
};

exports.updateTask = async (taskId, updatedData) => {
  const task = await Task.findByPk(taskId);
  if (!task) throw new Error("Task not found");

  await task.update(updatedData);
  return task;
};

exports.deleteTask = async (taskId) => {
  const task = await Task.findByPk(taskId);
  if (!task) throw new Error("Task not found");

  await task.destroy();
};