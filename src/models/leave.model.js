module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define("Leave", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leaveType: {
      type: DataTypes.ENUM("Casual Leave", "Sick Leave", "Earned Leave", "Maternity Leave", "Paternity Leave", "Other"),
      allowNull: false,
    },
    fromDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    toDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING, // Store file path or URL
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED, // userId of the employee
      allowNull: false,
    },
  });

  return Leave;
};
