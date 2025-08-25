const db = require("../config/sequelize");
const BankDetails = db.BankDetails;

exports.addBankDetails = async (data) => {
  const { employee_id } = data;
  const existing = await BankDetails.findOne({ where: { employee_id } });
  if (existing) {
    throw new Error("Bank details already exist for this employee");
  }
  return await BankDetails.create(data);
};

exports.getBankDetails = async () => {
  return await BankDetails.findAll({
    order: [["id", "ASC"]],
  });
};

exports.updateBankDetails = async (employee_id, data) => {
  const details = await BankDetails.findOne({ where: { employee_id } });
  if (!details) {
    throw new Error("Bank details not found");
  }
  return await details.update(data);
};

exports.deleteBankDetails = async (employee_id) => {
  const details = await BankDetails.findOne({ where: { employee_id } });
  if (!details) {
    throw new Error("Bank details not found");
  }
  await details.destroy();
};
