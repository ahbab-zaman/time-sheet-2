const express = require("express");
const employeeController = require("../controllers/employee.controller");
const isAdmin = require("../middlewares/isAdmin");
const employeeRouter = express.Router();



employeeRouter.post(
  "/add",
  isAdmin,
  employeeController.addEmployee
);

module.exports = employeeRouter;