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
    clock_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clock_out: {
      type: DataTypes.DATE,
      allowNull: true, // null means user is currently clocked in
    },
    hours: {
      type: DataTypes.NUMERIC,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
task_id: {
  type: DataTypes.INTEGER.UNSIGNED,
  allowNull: false,
  references: {
    model: 'tasks',
    key: 'id',
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
}
  }, {
    tableName: "time_entries",
    timestamps: true, // createdAt and updatedAt
  });

  return TimeEntry;
};
