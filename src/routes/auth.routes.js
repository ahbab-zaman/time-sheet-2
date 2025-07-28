const express = require("express");
const authController = require("../controllers/auth.controller");
// const authValidators = require("../../validators/auth.validator");
// const passport = require("../../configs/passport");
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


module.exports = authRouter;
