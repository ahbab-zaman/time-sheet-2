const express = require("express");
const financeSummaryController = require("../controllers/financeSummary.controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../utils/upload");
const financeSummaryRouter = express.Router();

financeSummaryRouter.post(
  "/import",
  authenticate,
  upload.single("csvFile"),
  financeSummaryController.importSummary
);
financeSummaryRouter.get(
  "/export",
  authenticate,
  financeSummaryController.exportSummary
);
financeSummaryRouter.get(
  "/data",
  authenticate,
  financeSummaryController.getSummaries
);
// New endpoint for releasing payments
financeSummaryRouter.post(
  "/release-payment/:employee_id",
  authenticate,
  financeSummaryController.releasePayment
);

module.exports = financeSummaryRouter;
