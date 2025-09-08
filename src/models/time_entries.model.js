const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TimeEntry = sequelize.define(
    "TimeEntry",
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
      timesheet_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      clock_in: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      clock_out: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      hours: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      task_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "time_entries",
      timestamps: true,
    }
  );

  return TimeEntry;
};
