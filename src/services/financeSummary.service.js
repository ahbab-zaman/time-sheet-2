const db = require("../config/sequelize");
const FinanceSummary = db.FinanceSummary;

exports.getSummaries = async () => {
  const summaries = await FinanceSummary.findAll({
    order: [["id", "ASC"]],
  });
  return summaries;
};

exports.saveSummaries = async (data) => {
  for (let item of data) {
    await FinanceSummary.create({
      employee_name: item["Employee Name"],
      employee_id: item["Employee ID"],
      email: item["Email"],
      project: item["Project"],
      hours: parseInt(item["Hours"]),
      rate: parseFloat(item["Rate per Hour"]),
      amount: parseFloat(item["Amount"]),
      status: item["Status"],
      month: "2025-08", // Default month; adjust if needed
    });
  }
};
