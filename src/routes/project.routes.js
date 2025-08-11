const express = require("express");
const projectController = require("../controllers/project.controller");
// const isAdmin = require("../middlewares/isAdmin");
const authenticate = require("../middlewares/authenticate");
const projectRouter = express.Router();



projectRouter.post(
  "/create",
  authenticate,
  projectController.createProject
);

projectRouter.get(
  "/",
  authenticate,
  projectController.getAllProjects
);

projectRouter.patch(
  "/:id",
  authenticate,
  projectController.updateProjectById
);

projectRouter.delete(
  "/:id",
  authenticate,
  projectController.deleteProjectById
);


module.exports = projectRouter;