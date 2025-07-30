require("dotenv").config();
const express = require("express");
const cors = require("cors");

const notFoundHandler = require("./middlewares/notFoundHandler");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const apiRouter = require("./routes");
const path = require("path");

const app = express();
console.log("✅ Express app initialized");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ Use this instead of body-parser
app.use(express.json({ limit: "20mb" }));

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the Timesheet API',
    status: 'success'
  });
});

app.use("/api/v1", apiRouter);
app.all(/.*/, notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
