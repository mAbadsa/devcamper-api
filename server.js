const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandle = require('./middleware/errors');

// Load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();

// Route Files
const bootcampRoutes = require('./routes/bootcamps');
const courseRoutes = require('./routes/courses');

const app = express();

// Body parser
app.use(express.json());

app.use(logger);

// Mount Route
app.use('/api/v1/bootcamps', bootcampRoutes);
app.use('/api/v1/courses', courseRoutes);

app.use(errorHandle);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgYellow.blue.bold)
);

// Handle unhandled promise rejections.

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & Exit process
  server.close(() => process.exit(1));
})
