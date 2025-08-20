const db = require("../config/sequelize");
const FinanceSummary = db.FinanceSummary;

exports.getSummaries = async (query = {}) => {
  const { employee_name, status } = query;
  const where = {};

  if (employee_name) {
    where.employee_name = {
      [db.Sequelize.Op.like]: `%${employee_name}%`,
    };
  }

  if (status && status !== "all") {
    where.status = status;
  }

  const summaries = await db.FinanceSummary.findAll({
    where,
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
