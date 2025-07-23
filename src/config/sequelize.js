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


// db.User = require("../models/user.model")(sequelize, DataTypes);
// db.Timesheet = require("../models/timesheet.model")(sequelize, DataTypes);


db.User = require("../models/user.model")(sequelize, DataTypes);






module.exports = db;
