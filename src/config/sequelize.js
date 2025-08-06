const { Sequelize, DataTypes } = require('sequelize');
const configs = require('./index');

const sequelize = new Sequelize(
  configs.databaseName,
  configs.databaseUsername,
  configs.databasePassword,
  {
    host: configs.databaseHost,
    dialect: "mysql",
    logging: false,
  }
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected successfully on ${configs.databaseName}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDatabase();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.User = require("../models/user.model")(sequelize, DataTypes);
db.Timesheet = require("../models/timesheets.model")(sequelize, DataTypes);
db.TimeEntry = require("../models/time_entries.model")(sequelize, DataTypes);
db.UserRole = require("../models/user_roles.model")(sequelize, DataTypes);
db.Employee = require("../models/employee.model")(sequelize, DataTypes);
db.Task = require("../models/task.model")(sequelize, DataTypes);


// Associations
db.Timesheet.hasMany(db.TimeEntry, {
  foreignKey: "timesheet_id",
  as: "entries",
  onDelete: "CASCADE",
});
db.TimeEntry.belongsTo(db.Timesheet, {
  foreignKey: "timesheet_id",
  as: "timesheet",
});

db.User.hasMany(db.UserRole, { foreignKey: 'user_id' });
db.UserRole.belongsTo(db.User, { foreignKey: 'user_id' });

db.UserRole.hasOne(db.Employee, {
  foreignKey: "user_id",
});

db.Employee.belongsTo(db.UserRole, {
  foreignKey: "user_id",
});

db.Employee.hasMany(db.Task, {
  foreignKey: "employee_id",
  as: "tasks",
  // onDelete: "SET NULL",     // or "CASCADE" if you want tasks deleted with employee
});

db.Task.belongsTo(db.Employee, {
  foreignKey: "employee_id",
  as: "employee",
});

//upcoming...

// db.Project = require("../models/project.model")(sequelize, DataTypes);  

// db.Project.hasMany(db.Task, {
//   foreignKey: "project_id",
//   as: "tasks",
//   onDelete: "SET NULL",   
// });

// db.Task.belongsTo(db.Project, {
//   foreignKey: "project_id",
//   as: "project",
// });

module.exports = db;
