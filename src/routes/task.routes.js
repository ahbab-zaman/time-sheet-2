const express = require("express");
const taskController = require("../controllers/task.controller");
// const isAdmin = require("../middlewares/isAdmin");
const authenticate = require("../middlewares/authenticate");
const taskRouter = express.Router();



taskRouter.post(
  "/create",
  authenticate,
  taskController.createTask
);


module.exports = taskRouter;