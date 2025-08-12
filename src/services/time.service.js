const db = require('../config/sequelize');
const Timesheet = db.Timesheet;
const TimeEntry = db.TimeEntry;
const { isWeekend } = require('../utils/dateUtils');

function getWeekRange(date) {
  const inputDate = new Date(date);
  const day = inputDate.getDay();
  const diffToMonday = (day + 6) % 7;
  const weekStart = new Date(inputDate);
  weekStart.setDate(inputDate.getDate() - diffToMonday);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return {
    weekStart: weekStart.toISOString().slice(0, 10),
    weekEnd: weekEnd.toISOString().slice(0, 10),
  };
}

exports.clockIn = async (employee_id, task_id, description) => {
  if (!employee_id || !task_id) {
    throw new Error("employee_id and task_id are required");
  }

 const clockInTime = new Date();
const dateOnly = clockInTime.toISOString().slice(0, 10);
  const { weekStart, weekEnd } = getWeekRange(clockInTime);

  let timesheet = await Timesheet.findOne({
    where: { employee_id, week_start_date: weekStart, week_end_date: weekEnd }
  });

  if (!timesheet) {
    timesheet = await Timesheet.create({
      employee_id,
      week_start_date: weekStart,
      week_end_date: weekEnd,
      total_hours: 0,
      status: "draft",
    });
  }

  const activeEntry = await TimeEntry.findOne({
    where: {
      timesheet_id: timesheet.id,
      task_id,
      clock_out: null,
    },
  });

  if (activeEntry) {
    throw new Error("Already clocked in on this task.");
  }

  const offdayWork = isWeekend(clockInTime);

  const newEntry = await TimeEntry.create({
    timesheet_id: timesheet.id,
    task_id,
    clock_in: clockInTime,
    date: dateOnly,
    description,
    is_offday_work: offdayWork,
  });

  return newEntry;
};

exports.clockOut = async (taskId) => {
  // Find the active clock-in without clock-out
  const activeEntry = await TimeEntry.findOne({
    where: {
      task_id: taskId,
      clock_out: null,
    },
  });

  if (!activeEntry) {
    throw new Error("No active clock-in found for this task.");
  }

  // Update the entry with clock-out time
  activeEntry.clockOut = new Date();

  // Calculate total hours worked
  const diffMs = activeEntry.clockOut - activeEntry.clockIn; // milliseconds
  activeEntry.totalHours = diffMs / (1000 * 60 * 60); // convert to hours

  await activeEntry.save();
  return activeEntry;
};
