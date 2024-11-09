const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes/index")
const app = express();

// Enable CORS with specified origins (recommend limiting origins for production)
app.use(
  cors({
    origin: "*", // Update to specific origins for production
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Security Middleware
app.use(mongosanitize());
app.use(xss());

app.use(routes) 


module.exports = app;
