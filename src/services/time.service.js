// const db = require("../config/sequelize");
// const Timesheet = db.Timesheet;
// const TimeEntry = db.TimeEntry;
// const Task = db.Task;
// const Employee = db.Employee;

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

// exports.clockIn = async (project_id, employee_id, task_id, description) => {
//   if (!employee_id || !project_id || !task_id) {
//     throw new Error("employee_id, project_id, and task_id are required");
//   }

//   const employee = await db.Employee.findOne({ where: { id: employee_id } });
//   if (!employee) {
//     throw new Error("Employee not found.");
//   }

//   const clockInTime = new Date();
//   const dateOnly = clockInTime.toISOString().slice(0, 10);
//   const { weekStart, weekEnd } = getWeekRange(clockInTime);

//   let timesheet = await db.Timesheet.findOne({
//     where: { employee_id, week_start_date: weekStart, week_end_date: weekEnd },
//   });

//   if (!timesheet) {
//     timesheet = await db.Timesheet.create({
//       employee_id,
//       week_start_date: weekStart,
//       week_end_date: weekEnd,
//       total_hours: 0,
//       status: "draft",
//     });
//   }

//   const activeEntry = await db.TimeEntry.findOne({
//     where: { timesheet_id: timesheet.id, task_id, clock_out: null },
//   });

//   if (activeEntry) {
//     throw new Error("Already clocked in on this task.");
//   }

//   const newEntry = await db.TimeEntry.create({
//     timesheet_id: timesheet.id,
//     project_id,
//     task_id,
//     employee_id, // Add employee_id here
//     clock_in: clockInTime,
//     date: dateOnly,
//     description,
//   });

//   return newEntry;
// };

// exports.clockOut = async (taskId) => {
//   const activeEntry = await TimeEntry.findOne({
//     where: { task_id: taskId, clock_out: null },
//   });

//   if (!activeEntry) {
//     throw new Error("No active clock-in found for this task.");
//   }

//   activeEntry.clock_out = new Date();
//   const diffMs = activeEntry.clock_out - activeEntry.clock_in;
//   activeEntry.hours = diffMs / (1000 * 60 * 60); // Hours with decimals

//   const timesheet = await Timesheet.findByPk(activeEntry.timesheet_id);
//   const totalHours = await TimeEntry.sum("hours", {
//     where: { timesheet_id: timesheet.id },
//   });
//   timesheet.total_hours = totalHours || 0;
//   await timesheet.save();

//   await activeEntry.save();
//   return activeEntry;
// };

// exports.getActiveEntry = async (employeeId) => {
//   const today = new Date().toISOString().slice(0, 10);
//   const { weekStart, weekEnd } = getWeekRange(new Date());
//   const timesheet = await Timesheet.findOne({
//     where: {
//       employee_id: employeeId,
//       week_start_date: weekStart,
//       week_end_date: weekEnd,
//     },
//   });
//   if (!timesheet) return null;

//   return await TimeEntry.findOne({
//     where: { timesheet_id: timesheet.id, clock_out: null },
//   });
// };

// exports.getTimesheetForWeek = async (employeeId, weekStart, weekEnd) => {
//   const timesheet = await Timesheet.findOne({
//     where: {
//       employee_id: employeeId,
//       week_start_date: weekStart,
//       week_end_date: weekEnd,
//     },
//     include: [
//       {
//         model: TimeEntry,
//         as: "entries", // Changed from "timeEntries" to "entries" to match the alias
//         include: [{ model: Task }, { model: db.Project }],
//       },
//     ],
//   });
//   return timesheet || { timeEntries: [], total_hours: 0, status: "draft" };
// };

// exports.submitTimesheet = async (timesheetId) => {
//   const timesheet = await Timesheet.findByPk(timesheetId);
//   if (!timesheet) throw new Error("Timesheet not found");
//   if (timesheet.status !== "draft")
//     throw new Error("Timesheet already submitted");
//   timesheet.status = "pending";
//   timesheet.submitted_at = new Date();
//   await timesheet.save();
//   return timesheet;
// };

// exports.approveTimesheet = async (timesheetId, adminId) => {
//   const timesheet = await Timesheet.findByPk(timesheetId);
//   if (!timesheet) throw new Error("Timesheet not found");
//   if (timesheet.status !== "pending")
//     throw new Error("Timesheet must be pending to approve");
//   timesheet.status = "approved";
//   timesheet.approved_at = new Date();
//   timesheet.approved_by = adminId;
//   await timesheet.save();
//   return timesheet;
// };

// exports.rejectTimesheet = async (timesheetId, adminId, remarks) => {
//   const timesheet = await Timesheet.findByPk(timesheetId);
//   if (!timesheet) throw new Error("Timesheet not found");
//   if (timesheet.status !== "pending")
//     throw new Error("Timesheet must be pending to reject");
//   timesheet.status = "rejected";
//   timesheet.approved_at = new Date();
//   timesheet.approved_by = adminId;
//   timesheet.comments = remarks || "";
//   await timesheet.save();
//   return timesheet;
// };

const db = require("../config/sequelize");
const Timesheet = db.Timesheet;
const TimeEntry = db.TimeEntry;
const Task = db.Task;
const Employee = db.Employee;

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

  const employee = await db.Employee.findOne({ where: { id: employee_id } });
  if (!employee) {
    throw new Error("Employee not found.");
  }

  const clockInTime = new Date();
  const dateOnly = clockInTime.toISOString().slice(0, 10);
  const { weekStart, weekEnd } = getWeekRange(clockInTime);

  let timesheet = await db.Timesheet.findOne({
    where: { employee_id, week_start_date: weekStart, week_end_date: weekEnd },
  });

  if (!timesheet) {
    timesheet = await db.Timesheet.create({
      employee_id,
      week_start_date: weekStart,
      week_end_date: weekEnd,
      total_hours: 0,
      status: "draft",
    });
  }

  const activeEntry = await db.TimeEntry.findOne({
    where: { timesheet_id: timesheet.id, task_id, clock_out: null },
  });

  if (activeEntry) {
    throw new Error("Already clocked in on this task.");
  }

  const newEntry = await db.TimeEntry.create({
    timesheet_id: timesheet.id,
    project_id,
    task_id,
    employee_id,
    clock_in: clockInTime,
    date: dateOnly,
    description,
  });

  return newEntry; // Ensure this returns the full object with id
};

exports.clockOut = async (entryId) => {
  // Changed parameter to entryId
  const activeEntry = await TimeEntry.findByPk(entryId); // Use findByPk for id

  if (!activeEntry) {
    throw new Error("No active clock-in found for this entry.");
  }

  if (activeEntry.clock_out !== null) {
    throw new Error("This entry is already clocked out.");
  }

  activeEntry.clock_out = new Date();
  const diffMs = activeEntry.clock_out - activeEntry.clock_in;
  activeEntry.hours = diffMs / (1000 * 60 * 60); // Hours with decimals

  const timesheet = await Timesheet.findByPk(activeEntry.timesheet_id);
  const totalHours = await TimeEntry.sum("hours", {
    where: { timesheet_id: timesheet.id },
  });
  timesheet.total_hours = totalHours || 0;
  await timesheet.save();

  await activeEntry.save();
  return activeEntry;
};

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

exports.getTimesheetForWeek = async (employeeId, weekStart, weekEnd) => {
  const timesheet = await Timesheet.findOne({
    where: {
      employee_id: employeeId,
      week_start_date: weekStart,
      week_end_date: weekEnd,
    },
    include: [
      {
        model: TimeEntry,
        as: "entries",
        include: [
          {
            model: Task,
            as: "task",
            include: [{ model: db.Project, as: "project" }], // ✅ Project comes through Task
          },
        ],
      },
    ],
  });

  return timesheet || { timeEntries: [], total_hours: 0, status: "draft" };
};

exports.submitTimesheet = async (timesheetId) => {
  const timesheet = await Timesheet.findByPk(timesheetId);
  if (!timesheet) throw new Error("Timesheet not found");
  if (timesheet.status !== "draft")
    throw new Error("Timesheet already submitted");
  timesheet.status = "pending";
  timesheet.submitted_at = new Date();
  await timesheet.save();
  return timesheet;
};

exports.approveTimesheet = async (timesheetId, adminId) => {
  const timesheet = await Timesheet.findByPk(timesheetId);
  if (!timesheet) throw new Error("Timesheet not found");
  if (timesheet.status !== "pending")
    throw new Error("Timesheet must be pending to approve");
  timesheet.status = "approved";
  timesheet.approved_at = new Date();
  timesheet.approved_by = adminId;
  await timesheet.save();
  return timesheet;
};

exports.rejectTimesheet = async (timesheetId, adminId, remarks) => {
  const timesheet = await Timesheet.findByPk(timesheetId);
  if (!timesheet) throw new Error("Timesheet not found");
  if (timesheet.status !== "pending")
    throw new Error("Timesheet must be pending to reject");
  timesheet.status = "rejected";
  timesheet.approved_at = new Date();
  timesheet.approved_by = adminId;
  timesheet.comments = remarks || "";
  await timesheet.save();
  return timesheet;
};
