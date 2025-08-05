const express = require("express");
const employeeController = require("../controllers/employee.controller");
// const isAdmin = require("../middlewares/isAdmin");
const authenticate = require("../middlewares/authenticate");
const employeeRouter = express.Router();



employeeRouter.post(
  "/add",
  authenticate,
  employeeController.addEmployee
);

employeeRouter.get(
  "/",
  authenticate,
  employeeController.getEmployees
);

employeeRouter.patch(
  "/:id",
  authenticate,
  employeeController.updateEmployee
);

employeeRouter.delete(
  "/:id",
  authenticate,
  employeeController.deleteEmployee
);

module.exports = employeeRouter;