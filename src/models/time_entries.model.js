const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TimeEntry = sequelize.define("TimeEntry", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    timesheet_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hours: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "time_entries",
    timestamps: true, // createdAt and updatedAt
  });

  return TimeEntry;
};
