const bodyParser = require('body-parser');
const app = require('./app');
const configs = require('../src/config');
require("./config/sequelize");
const db = require('./config/sequelize');

// const environment = configs.nodeEnv
// const PORT = process.env.SERVER_PORT || 1001;


const PORT = configs.serverPort || 1001;
const environment = configs.nodeEnv || 'development';


// Middleware
app.use(bodyParser.json());




// Error handling for unhandled promise rejections and uncaught exceptions

process.on('exit', (code) => {
  console.log(`Process exit event with code: ${code}`);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  process.exit(0);
});

app.listen(PORT, async () => {
  try {
    console.log(`Server is alive on PORT:${PORT} in ${environment} environment`);
    // Uncomment and wrap with try-catch to catch sync errors
    // await db.User.sync({ alter: true });

  } catch (err) {
    console.error("❌ Error during startup:", err);
    process.exit(1);
  }
});

// app.listen(PORT, () => {
//   console.log(`Server is alive on PORT:${PORT} in ${environment} environment`);
// });


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

