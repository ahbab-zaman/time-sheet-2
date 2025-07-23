const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Timesheet = sequelize.define("Timesheet", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.UUID,
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
      type: DataTypes.NUMERIC,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("draft", "submitted", "approved", "rejected"),
      defaultValue: "draft",
    },
    submitted_at: {
      type: DataTypes.DATE,
    },
    approved_at: {
      type: DataTypes.DATE,
    },
    approved_by: {
      type: DataTypes.UUID,
    },
    comments: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: "timesheets",
    timestamps: true,
  });

  return Timesheet;
};
