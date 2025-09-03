const timeService = require("../services/time.service");

exports.clockIn = async (req, res) => {
  try {
    const { project_id, employee_id, task_id, description } = req.body;
    const newEntry = await timeService.clockIn(
      project_id,
      employee_id,
      task_id,
      description
    );
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

exports.getActiveEntry = async (req, res) => {
  try {
    const { employee_id } = req.query;
    if (!employee_id) {
      return res.status(400).json({ error: "employee_id is required" });
    }
    const entry = await timeService.getActiveEntry(employee_id);
    res.json(entry || { message: "No active entry" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTimesheet = async (req, res) => {
  try {
    const { employee_id, week_start, week_end } = req.query;
    if (!employee_id || !week_start || !week_end) {
      return res
        .status(400)
        .json({ error: "employee_id, week_start, and week_end are required" });
    }
    const timesheet = await timeService.getTimesheetForWeek(
      employee_id,
      week_start,
      week_end
    );
    res.json(timesheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.submitTimesheet = async (req, res) => {
  try {
    const { timesheet_id } = req.params;
    if (!timesheet_id) {
      return res.status(400).json({ error: "timesheet_id is required" });
    }
    const timesheet = await timeService.submitTimesheet(timesheet_id);
    res.json({ message: "Timesheet submitted", data: timesheet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.approveTimesheet = async (req, res) => {
  try {
    const { timesheet_id } = req.params;
    const { admin_id } = req.body;
    if (!timesheet_id || !admin_id) {
      return res
        .status(400)
        .json({ error: "timesheet_id and admin_id are required" });
    }
    const timesheet = await timeService.approveTimesheet(
      timesheet_id,
      admin_id
    );
    res.json({ message: "Timesheet approved", data: timesheet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rejectTimesheet = async (req, res) => {
  try {
    const { timesheet_id } = req.params;
    const { admin_id, remarks } = req.body;
    if (!timesheet_id || !admin_id) {
      return res
        .status(400)
        .json({ error: "timesheet_id and admin_id are required" });
    }
    const timesheet = await timeService.rejectTimesheet(
      timesheet_id,
      admin_id,
      remarks
    );
    res.json({ message: "Timesheet rejected", data: timesheet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
