const {Sequelize, DataTypes} = require('sequelize');
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
      console.log(
        `Database connected successfully on ${configs.databaseName}`
      );

    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

connectDatabase();


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.User = require("../models/user.model")(sequelize, DataTypes);
db.Timesheet = require("../models/timesheets.model")(sequelize, DataTypes);
db.TimeEntry = require("../models/time_entries.model")(sequelize, DataTypes);

// One Timesheet has many TimeEntries
db.Timesheet.hasMany(db.TimeEntry, {
  foreignKey: "timesheet_id",
  as: "entries",
  onDelete: "CASCADE",
});

db.TimeEntry.belongsTo(db.Timesheet, {
  foreignKey: "timesheet_id",
  as: "timesheet",
});




module.exports = db;
