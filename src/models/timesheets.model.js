const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Timesheet = sequelize.define(
    "Timesheet",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      week_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      week_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_hours: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("draft", "pending", "approved", "rejected"),
        defaultValue: "draft",
      },
      submitted_at: {
        type: DataTypes.DATE,
      },
      approved_at: {
        type: DataTypes.DATE,
      },
      approved_by: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      comments: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "timesheets",
      timestamps: true,
    }
  );

  return Timesheet;
};
