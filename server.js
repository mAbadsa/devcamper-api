const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const colors = require("colors");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandle = require("./middleware/errors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");

// Load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();

// Route Files
const bootcampRoutes = require("./routes/bootcamps");
const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const reviewsRoutes = require("./routes/reviews");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// app.use(logger);

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Prevent NoSQL injection sanitize
app.use(fileUpload());

app.use(mongoSanitize());

app.use(xss());

// Secure the apps by setting various HTTP headers by using helmet
app.use(helmet());

app.use(express.static(path.join(__dirname, "public")));

// Mount Route
app.use("/api/v1/bootcamps", bootcampRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/reviews", reviewsRoutes);

app.use(errorHandle);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgYellow
      .blue.bold
  )
);

// Handle unhandled promise rejections.

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & Exit process
  server.close(() => process.exit(1));
});
