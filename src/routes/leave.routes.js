const express = require("express");
const leaveController = require("../controllers/leave.controller");
// const isAdmin = require("../middlewares/isAdmin");
const authenticate = require("../middlewares/authenticate");
const leaveRouter = express.Router();



leaveRouter.post(
  "/create",
  authenticate,
  leaveController.createLeave
);

leaveRouter.get(
  "/",
  authenticate,
  leaveController.getAllLeaves
);

leaveRouter.patch(
  "/:id",
  authenticate,
  leaveController.updateLeave
);

leaveRouter.delete(
  "/:id",
  authenticate,
  leaveController.deleteLeave
);


module.exports = leaveRouter;