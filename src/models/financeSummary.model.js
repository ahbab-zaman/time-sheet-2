// financeSummary.model.js
module.exports = (sequelize, DataTypes) => {
  const FinanceSummary = sequelize.define(
    "FinanceSummary",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hours: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Paid", "Unpaid"),
        allowNull: false,
      },
      month: {
        type: DataTypes.STRING, // e.g., '2025-08'
        allowNull: false,
      },
    },
    {
      tableName: "finance_summaries",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return FinanceSummary;
};
