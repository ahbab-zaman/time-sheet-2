const express = require("express");
const bankDetailsController = require("../controllers/bankDetails.controller");
const authenticate = require("../middlewares/authenticate");
const bankDetailsRouter = express.Router();

bankDetailsRouter.post(
  "/add",
  authenticate,
  bankDetailsController.addBankDetails
);

bankDetailsRouter.get("/", authenticate, bankDetailsController.getBankDetails);

bankDetailsRouter.put(
  "/update/:employee_id",
  authenticate,
  bankDetailsController.updateBankDetails
);

bankDetailsRouter.delete(
  "/delete/:employee_id",
  authenticate,
  bankDetailsController.deleteBankDetails
);

module.exports = bankDetailsRouter;
