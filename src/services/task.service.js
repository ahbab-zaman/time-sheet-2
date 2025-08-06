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