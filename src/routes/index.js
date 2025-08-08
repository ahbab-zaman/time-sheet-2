const express = require("express");
const apiRouter = express.Router();
const authRouter = require("./auth.routes");
const employeeRouter = require("./employee.routes");
const taskRouter = require("./task.routes");
const leaveRouter = require("./leave.routes");

// Define your route configurations here
const routers = [
  {
    path: "/auth",
    router: authRouter
  },
  {
    path: "/employee",
    router: employeeRouter
  },
  {
    path: "/task",
    router: taskRouter
  },
  {
    path: "/leave",
    router: leaveRouter
  }
];

// Loop through and attach when available
routers.forEach(({ path, router, middlewares }) => {
  if (router) {
    if (middlewares && middlewares.length > 0) {
      apiRouter.use(path, ...middlewares, router);
    } else {
      apiRouter.use(path, router);
    }
  }
});

module.exports = apiRouter;
