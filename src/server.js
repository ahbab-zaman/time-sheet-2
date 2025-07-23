
const bodyParser = require('body-parser');
const app = require("./app");
const configs = require('./config');
require("./config/sequelize");
// const db = require('./config/sequelize');


const PORT = configs.serverPort;
const environment = configs.nodeEnv

// Middleware
app.use(bodyParser.json());

app.listen(PORT, async () => {
  console.log(
    `Server is alive on PORT:${PORT} in ${environment} environment`
  );

  // Uncomment the following line to sync the database models
  // await db.User.sync({ alter: true });
  // await db.TimeEntry.sync({ alter: true });
})

// Error handling for unhandled promise rejections and uncaught exceptions
process.on("unhandledRejection", (error) => {
  console.log("🔴 UNHANDLED REJECTION! Server shutting down...");
  console.log(error);
  app.on("close", () => {
    process.exit(1);
  });
});

// Error handling for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log("🔴 UNCAUGHT EXCEPTION! Server shutting down...");
  console.log(error);
  app.on("close", () => {
    process.exit(1);
  });
});

