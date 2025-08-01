const express = require("express");
const authController = require("../controllers/auth.controller");
// const authValidators = require("../../validators/auth.validator");
// const passport = require("../../configs/passport");
const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");
const isAdmin = require("../middlewares/isAdmin");
const authRouter = express.Router();

authRouter.post(
  "/register",
//   authValidators.registerValidator,
  authController.register
);

authRouter.post("/login", 
    // authValidators.loginValidator, 
    authController.login
);

// Assign role — only accessible by Admin
authRouter.post("/assign-role",
  authenticate,
  authorizeRole("Admin"),
  authController.assignRole
);

authRouter.post("/revoke-role",
  authenticate,
  isAdmin,
  authController.revokeRole
);

authRouter.get("/users",
  authenticate,
  isAdmin,
  authController.getAllUsers
);

authRouter.patch("/users/:id",
  authenticate,
  isAdmin,
  authController.updateUser
);

authRouter.delete("/users/:id",
  authenticate,
  isAdmin,
  authController.deleteUser
);

module.exports = authRouter;
