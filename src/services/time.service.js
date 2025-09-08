const db = require("../config/sequelize");
const Timesheet = db.Timesheet;
const TimeEntry = db.TimeEntry;
const Task = db.Task;
const Employee = db.Employee;

const getWeekRange = (date) => {
  const inputDate = new Date(date);
  const day = inputDate.getDay();
  const diffToMonday = (day + 6) % 7; // For Monday start
  const weekStart = new Date(inputDate);
  weekStart.setDate(inputDate.getDate() - diffToMonday);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  // Return local strings
  const formatLocal = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const dayStr = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

  return {
    weekStart: formatLocal(weekStart),
    weekEnd: formatLocal(weekEnd),
  };
};

exports.clockIn = async (project_id, employee_id, task_id, description) => {
  if (!employee_id || !project_id || !task_id) {
    throw new Error("employee_id, project_id, and task_id are required");
  }

  const employee = await Employee.findOne({ where: { id: employee_id } });
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

  return newEntry;
};

exports.clockOut = async (entryId) => {
  const activeEntry = await TimeEntry.findByPk(entryId);

  if (!activeEntry) {
    throw new Error("No active clock-in found for this entry.");
  }

  if (activeEntry.clock_out !== null) {
    throw new Error("This entry is already clocked out.");
  }

  activeEntry.clock_out = new Date();
  const diffMs = activeEntry.clock_out - activeEntry.clock_in;
  activeEntry.hours = diffMs / (1000 * 60 * 60);

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
  // Use input strings directly (they are local YYYY-MM-DD)
  const startDate = weekStart; // e.g., "2025-09-08"
  const endDate = weekEnd; // e.g., "2025-09-14"

  // Query TimeEntry directly
  const timeEntries = await TimeEntry.findAll({
    where: {
      employee_id: employeeId,
      date: {
        [db.Sequelize.Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: Task,
        as: "task",
        include: [{ model: db.Project, as: "project" }],
      },
    ],
  });

  // Calculate total hours
  const total_hours = timeEntries.reduce(
    (sum, entry) => sum + (parseFloat(entry.hours) || 0),
    0
  );

  // Return formatted response
  return {
    employee_id: employeeId,
    week_start_date: startDate,
    week_end_date: endDate,
    timeEntries: timeEntries,
    total_hours: total_hours.toFixed(2),
    status: "pending",
  };
};

exports.getAllEmployeesTimesheets = async (status) => {
  try {
    const where = {};
    if (status && status !== "all") {
      where.status = status;
    }

    const timesheets = await Timesheet.findAll({
      where,
      attributes: [
        "id",
        "employee_id",
        "week_start_date",
        "week_end_date",
        "total_hours",
        "status",
        "approved_at",
        "comments",
      ],
      include: [
        {
          model: TimeEntry,
          as: "entries",
          attributes: ["id", "date", "hours", "description", "task_id"],
          include: [
            {
              model: Task,
              as: "task",
              include: [
                {
                  model: db.Project,
                  as: "project",
                },
              ],
            },
          ],
        },
        {
          model: Employee,
          as: "employee",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["week_start_date", "DESC"]],
    });
    console.log("Total time sheets", timesheets);

    return timesheets.length
      ? timesheets
      : {
          message: "No timesheets found",
          timesheets: [],
        };
  } catch (error) {
    throw new Error(`Failed to fetch timesheets: ${error.message}`);
  }
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

exports.approveTimesheet = async (timesheetId) => {
  const timesheet = await Timesheet.findByPk(timesheetId);
  if (!timesheet) throw new Error("Timesheet not found");
  if (timesheet.status !== "pending")
    throw new Error("Timesheet must be pending to approve");
  timesheet.status = "approved";
  timesheet.approved_at = new Date();
  await timesheet.save();
  return timesheet;
};

exports.rejectTimesheet = async (timesheetId, remarks) => {
  const timesheet = await Timesheet.findByPk(timesheetId);
  if (!timesheet) throw new Error("Timesheet not found");
  if (timesheet.status !== "pending")
    throw new Error("Timesheet must be pending to reject");
  timesheet.status = "rejected";
  timesheet.approved_at = new Date();
  timesheet.comments = remarks || "";
  await timesheet.save();
  return timesheet;
};
