const express = require("express");
const timeController = require("../controllers/time.controller");
const timeRouter = express.Router();

timeRouter.post("/clock-in", timeController.clockIn);
timeRouter.post("/clock-out/:taskId", timeController.clockOut);
timeRouter.get("/timeentries/active", timeController.getActiveEntry);
timeRouter.get("/timesheets/week", timeController.getTimesheet);
timeRouter.get("/timesheets/all", timeController.getAllEmployeesTimesheets);
timeRouter.patch(
  "/timesheets/:timesheet_id/submit",
  timeController.submitTimesheet
);
timeRouter.patch(
  "/timesheets/:timesheet_id/approve",
  timeController.approveTimesheet
);
timeRouter.patch(
  "/timesheets/:timesheet_id/reject",
  timeController.rejectTimesheet
);

module.exports = timeRouter;
