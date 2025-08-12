const timeService = require('../services/time.service');

exports.clockIn = async (req, res) => {
  try {
    const { employee_id, task_id, description } = req.body;
    const newEntry = await timeService.clockIn(employee_id, task_id, description);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.clockOut = async (req, res) => {
  try {
 const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const updatedEntry = await timeService.clockOut(taskId);

    res.json({
      message: "Clock-out successful",
      data: updatedEntry,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};