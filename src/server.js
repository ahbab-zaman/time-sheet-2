const app = require('./app');
const configs = require('./config');
require("./config/sequelize");
const db = require('./config/sequelize');

const PORT = configs.serverPort || 4001;
const environment = configs.nodeEnv || 'development';

app.listen(PORT, async () => {
  try {
    console.log(`Server is alive on PORT:${PORT} in ${environment} environment`);
     // await db.User.sync({ alter: true });
  } catch (err) {
    console.error("❌ Error during startup:", err);
    process.exit(1);
  }
});


process.on("exit", (code) => {
  console.log(`Process exit event with code: ${code}`);
});


process.on("SIGINT", async () => {
  console.log('SIGINT received, shutting down...');
  
  try {
    await db.sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error while closing DB connection:', error);
  }
  
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log('SIGTERM received, shutting down...');
  process.exit(0);
});


process.on("unhandledRejection", (error) => {
  console.log("🔴 UNHANDLED REJECTION! Server shutting down...");
  console.log(error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("🔴 UNCAUGHT EXCEPTION! Server shutting down...");
  console.log(error);
  process.exit(1);
});
