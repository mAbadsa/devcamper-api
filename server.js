const express = require("express");
const dotenv = require("dotenv");
const bootcampRoutes = require('./routes/bootcamps');

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use('/api/v1/bootcamps', bootcampRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
