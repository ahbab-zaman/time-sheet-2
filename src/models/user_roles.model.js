module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define("UserRole", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id"
      }
    },
    role: {
      type: DataTypes.ENUM("Admin", "Manager", "Employee", "Finance"),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: "user_roles",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  return UserRole;
};
