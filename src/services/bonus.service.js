const db = require("../config/sequelize");
const Bonus = db.Bonus;

exports.createBonus = async (bonusData) => {
  const { employee_id, amount, month, reason } = bonusData;

  // Optional: validate required fields
  if (!employee_id || !amount || !month) {
    throw new Error("employee_id, amount, and month are required");
  }

  const newBonus = await Bonus.create({
    employee_id,
    amount,
    month,
    reason,
  });

  return newBonus;
};

exports.getBonuses = async (page = 1) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Bonus.findAndCountAll({
    limit,
    offset,
    order: [["created_at", "DESC"]],
  });

  return {
    total: count,
    page,
    pageSize: limit,
    bonuses: rows,
  };
};

exports.updateBonus = async (bonusId, updatedData) => {
  const bonus = await Bonus.findByPk(bonusId);
  if (!bonus) throw new Error("Bonus not found");

  await bonus.update(updatedData);
  return bonus;
};

exports.deleteBonus = async (bonusId) => {
  const bonus = await Bonus.findByPk(bonusId);
  if (!bonus) throw new Error("Bonus not found");

  await bonus.destroy();
};
