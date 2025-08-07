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

taskRouter.get(
  "/",
  authenticate,
  taskController.getTasks
);

taskRouter.patch(
  "/:id",
  authenticate,
  taskController.updateTask
);

taskRouter.delete(
  "/:id",
  authenticate,
  taskController.deleteTask
);


module.exports = taskRouter;