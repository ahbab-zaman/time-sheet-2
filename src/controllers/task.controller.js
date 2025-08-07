const TaskService = require('../services/task.service');


exports.createTask = async (req, res) => {
  try {
    const taskData = req.body;

    const newTask = await TaskService.createTask(taskData);

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const tasks = await TaskService.getTasks(page);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;
    const updatedTask = await TaskService.updateTask(taskId, updatedData);
    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await TaskService.deleteTask(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};