const FinanceSummaryService = require("../services/financeSummary.service");
const csv = require("csv-parser");
const fs = require("fs");

exports.importSummary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        await FinanceSummaryService.saveSummaries(results);
        fs.unlinkSync(req.file.path); // Clean up temporary file
        res.status(200).json({ message: "Data imported successfully" });
      });
  } catch (error) {
    console.error("Error importing summary:", error);
    res.status(500).json({ error: "Failed to import summary" });
  }
};

exports.exportSummary = async (req, res) => {
  try {
    const summaries = await FinanceSummaryService.getSummaries();

    let csv =
      "Employee Name,Employee ID,Email,Project,Hours,Rate per Hour,Amount,Status\n";
    for (let summary of summaries) {
      csv += `${summary.employee_name},${summary.employee_id},${summary.email},${summary.project},${summary.hours},${summary.rate},${summary.amount},${summary.status}\n`;
    }

    res.header("Content-Type", "text/csv");
    res.attachment("payroll_summary.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting summary:", error);
    res.status(500).json({ error: "Failed to export summary" });
  }
};

exports.getSummaries = async (req, res) => {
  try {
    const summaries = await FinanceSummaryService.getSummaries();
    res.status(200).json(summaries);
  } catch (error) {
    console.error("Error fetching summaries:", error);
    res.status(500).json({ error: "Failed to fetch summaries" });
  }
};
