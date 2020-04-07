const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();

// Route Files
const bootcampRoutes = require('./routes/bootcamps');

const app = express();

app.use(morgan('common'));

// Mount Route
app.use('/api/v1/bootcamps', bootcampRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections.

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & Exit process
  server.close(() => process.exit(1));
})
