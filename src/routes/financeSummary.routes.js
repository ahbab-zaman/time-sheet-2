const express = require("express");
const financeSummaryController = require("../controllers/financeSummary.controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../utils/upload"); // New middleware for file upload
const financeSummaryRouter = express.Router();

financeSummaryRouter.post(
  "/import",
  authenticate,
  upload.single("csvFile"), // 'csvFile' is the field name in the form
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
); // New endpoint to fetch data for UI

module.exports = financeSummaryRouter;
