module.exports = (sequelize, DataTypes) => {
  const BankDetails = sequelize.define(
    "BankDetails",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ifsc_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_holder_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      upi_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "bank_details",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return BankDetails;
};
