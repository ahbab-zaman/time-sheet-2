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