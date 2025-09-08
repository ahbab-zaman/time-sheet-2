// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const notFoundHandler = require("./middlewares/notFoundHandler");
// const globalErrorHandler = require("./middlewares/globalErrorHandler");
// const apiRouter = require("./routes");
// const path = require("path");

// const app = express();
// console.log("✅ Express app initialized");

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// const corsOptions = {
//   origin:
//     process.env.NODE_ENV === "production"
//       ? process.env.ALLOWED_ORIGINS?.split(",") || []
//       : ["http://localhost:5173", "http://localhost:5174"],
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// // ✅ Use this instead of body-parser
// app.use(express.json({ limit: "20mb" }));

// app.get("/", (req, res) => {
//   res.send({
//     message: "Welcome to the Timesheet API",
//     status: "success",
//   });
// });

// app.get("/test", (req, res) => {
//   res.send({
//     message: "Testing the timesheet",
//     status: "Success",
//   });
// });

// app.use("/api/v1", apiRouter);
// app.all(/.*/, notFoundHandler);
// app.use(globalErrorHandler);

// module.exports = app;

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes");

const app = express();
console.log("✅ Express app initialized");

// Allow all origins for simplicity (fixes live CORS issue)
app.use(
  cors({ origin: "https://airepro-timesheet-f.vercel.app", credentials: true })
);

// Parse JSON body
app.use(express.json({ limit: "20mb" }));

// Basic test routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Timesheet API", status: "success" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Testing the timesheet", status: "success" });
});

// Main API
app.use("/api/v1", apiRouter);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
