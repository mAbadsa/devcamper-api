const express = require("express");
const dotenv = require("dotenv");

// Route Files
const bootcampRoutes = require('./routes/bootcamps');

// Middleware files
const morgan = require('morgan');

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(morgan('common'));

// Mount Route
app.use('/api/v1/bootcamps', bootcampRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
