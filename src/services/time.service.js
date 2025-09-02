// const db = require('../config/sequelize');
// const Timesheet = db.Timesheet;
// const TimeEntry = db.TimeEntry;
// const Task = db.Task
// // const { isWeekend } = require('../utils/dateUtils');

// function getWeekRange(date) {
//   const inputDate = new Date(date);
//   const day = inputDate.getDay();
//   const diffToMonday = (day + 6) % 7;
//   const weekStart = new Date(inputDate);
//   weekStart.setDate(inputDate.getDate() - diffToMonday);
//   weekStart.setHours(0, 0, 0, 0);

//   const weekEnd = new Date(weekStart);
//   weekEnd.setDate(weekStart.getDate() + 6);
//   weekEnd.setHours(23, 59, 59, 999);

//   return {
//     weekStart: weekStart.toISOString().slice(0, 10),
//     weekEnd: weekEnd.toISOString().slice(0, 10),
//   };
// }

// exports.clockIn = async (project_id, employee_id,  task_id, description) => {
//   if (!employee_id || !project_id || !task_id) {
//     throw new Error("employee_id, project_id, and task_id are required");
//   }

//   // Optional: Validate that task belongs to the given project
//   const task = await db.Task.findOne({ where: { id: task_id, project_id } });
//   if (!task) {
//     throw new Error("Task does not belong to the selected project.");
//   }

//   const clockInTime = new Date();
//   const dateOnly = clockInTime.toISOString().slice(0, 10);
//   const { weekStart, weekEnd } = getWeekRange(clockInTime);

//   let timesheet = await Timesheet.findOne({
//     where: { employee_id, week_start_date: weekStart, week_end_date: weekEnd }
//   });

//   if (!timesheet) {
//     timesheet = await Timesheet.create({
//       employee_id,
//       week_start_date: weekStart,
//       week_end_date: weekEnd,
//       total_hours: 0,
//       status: "draft",
//     });
//   }

//   const activeEntry = await TimeEntry.findOne({
//     where: {
//       timesheet_id: timesheet.id,
//       task_id,
//       clock_out: null,
//     },
//   });

//   if (activeEntry) {
//     throw new Error("Already clocked in on this task.");
//   }

//   const newEntry = await TimeEntry.create({
//     timesheet_id: timesheet.id,
//     project_id,  // <-- new field
//     task_id,
//     clock_in: clockInTime,
//     date: dateOnly,
//     description,
//   });

//   return newEntry;
// };

// // exports.clockIn = async (employee_id, task_id, description) => {
// //   if (!employee_id || !task_id) {
// //     throw new Error("employee_id and task_id are required");
// //   }

// //  const clockInTime = new Date();
// // const dateOnly = clockInTime.toISOString().slice(0, 10);
// //   const { weekStart, weekEnd } = getWeekRange(clockInTime);

// //   let timesheet = await Timesheet.findOne({
// //     where: { employee_id, week_start_date: weekStart, week_end_date: weekEnd }
// //   });

// //   if (!timesheet) {
// //     timesheet = await Timesheet.create({
// //       employee_id,
// //       week_start_date: weekStart,
// //       week_end_date: weekEnd,
// //       total_hours: 0,
// //       status: "draft",
// //     });
// //   }

// //   const activeEntry = await TimeEntry.findOne({
// //     where: {
// //       timesheet_id: timesheet.id,
// //       task_id,
// //       clock_out: null,
// //     },
// //   });

// //   if (activeEntry) {
// //     throw new Error("Already clocked in on this task.");
// //   }

// //   const newEntry = await TimeEntry.create({
// //     timesheet_id: timesheet.id,
// //     task_id,
// //     clock_in: clockInTime,
// //     date: dateOnly,
// //     description,
// //   });

// //   return newEntry;
// // };

// exports.clockOut = async (taskId) => {
//   // Find the active clock-in without clock-out
//   const activeEntry = await TimeEntry.findOne({
//     where: {
//       task_id: taskId,
//       clock_out: null,
//     },
//   });

//   if (!activeEntry) {
//     throw new Error("No active clock-in found for this task.");
//   }

//   // Update the entry with clock-out time
//   activeEntry.clockOut = new Date();

//   // Calculate total hours worked
//   const diffMs = activeEntry.clockOut - activeEntry.clockIn; // milliseconds
//   activeEntry.totalHours = diffMs / (1000 * 60 * 60); // convert to hours

//   await activeEntry.save();
//   return activeEntry;
// };

const db = require("../config/sequelize");
const Timesheet = db.Timesheet;
const TimeEntry = db.TimeEntry;
const Task = db.Task;

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

exports.clockIn = async (project_id, employee_id, task_id, description) => {
  if (!employee_id || !project_id || !task_id) {
    throw new Error("employee_id, project_id, and task_id are required");
  }

  const task = await db.Task.findOne({ where: { id: task_id, project_id } });
  if (!task) {
    throw new Error("Task does not belong to the selected project.");
  }

  const clockInTime = new Date();
  const dateOnly = clockInTime.toISOString().slice(0, 10);
  const { weekStart, weekEnd } = getWeekRange(clockInTime);

  let timesheet = await Timesheet.findOne({
    where: { employee_id, week_start_date: weekStart, week_end_date: weekEnd },
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
    where: { timesheet_id: timesheet.id, task_id, clock_out: null },
  });

  if (activeEntry) {
    throw new Error("Already clocked in on this task.");
  }

  const newEntry = await TimeEntry.create({
    timesheet_id: timesheet.id,
    project_id,
    task_id,
    clock_in: clockInTime,
    date: dateOnly,
    description,
  });

  return newEntry;
};

exports.clockOut = async (taskId) => {
  const activeEntry = await TimeEntry.findOne({
    where: { task_id: taskId, clock_out: null },
  });

  if (!activeEntry) {
    throw new Error("No active clock-in found for this task.");
  }

  activeEntry.clock_out = new Date();
  const diffMs = activeEntry.clock_out - activeEntry.clock_in;
  activeEntry.hours = diffMs / (1000 * 60 * 60); // Hours with decimals

  // Update the timesheet total_hours
  const timesheet = await Timesheet.findByPk(activeEntry.timesheet_id);
  const totalHours = await TimeEntry.sum("hours", {
    where: { timesheet_id: timesheet.id },
  });
  timesheet.total_hours = totalHours || 0;
  await timesheet.save();

  await activeEntry.save();
  return activeEntry;
};

// New: Get active time entry for an employee
exports.getActiveEntry = async (employeeId) => {
  const today = new Date().toISOString().slice(0, 10);
  const { weekStart, weekEnd } = getWeekRange(new Date());
  const timesheet = await Timesheet.findOne({
    where: {
      employee_id: employeeId,
      week_start_date: weekStart,
      week_end_date: weekEnd,
    },
  });
  if (!timesheet) return null;

  return await TimeEntry.findOne({
    where: { timesheet_id: timesheet.id, clock_out: null },
  });
};

// New: Get timesheet for a week
exports.getTimesheetForWeek = async (employeeId, weekStart, weekEnd) => {
  const timesheet = await Timesheet.findOne({
    where: {
      employee_id: employeeId,
      week_start_date: weekStart,
      week_end_date: weekEnd,
    },
    include: [{ model: TimeEntry, include: [Task, { model: db.Project }] }],
  });
  return timesheet || { timeEntries: [], total_hours: 0, status: "draft" };
};

// New: Submit timesheet
exports.submitTimesheet = async (timesheetId) => {
  const timesheet = await Timesheet.findByPk(timesheetId);
  if (!timesheet) throw new Error("Timesheet not found");
  if (timesheet.status !== "draft")
    throw new Error("Timesheet already submitted");
  timesheet.status = "submitted";
  timesheet.submitted_at = new Date();
  await timesheet.save();
  return timesheet;
};
