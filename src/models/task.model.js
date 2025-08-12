module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
  project_id: {
  type: DataTypes.INTEGER.UNSIGNED,
  allowNull: false,  // stays NOT NULL if you want
  references: {
    model: 'projects',
    key: 'id',
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  },
    employee_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estimated_hours: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  }, {
    tableName: "tasks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Task;
};
