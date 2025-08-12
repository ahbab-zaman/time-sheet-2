const express = require("express");
const timeController = require("../controllers/time.controller");
// const isAdmin = require("../middlewares/isAdmin");
// const authenticate = require("../middlewares/authenticate");
const timeRouter = express.Router();



timeRouter.post(
  "/clock-in",
//   authenticate,
  timeController.clockIn
);

timeRouter.post(
  "/clock-out/:taskId",
//   authenticate,
  timeController.clockOut
);

module.exports = timeRouter;