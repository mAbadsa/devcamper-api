const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.get('/api/v1/boocamps', (req, res) => {
    res.status(200).json({success: true, msg: "Show all bootcamps", data: [], error: []});
})


app.put('/api/v1/boocamps/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Show bootcamp ${req.params.id}`, data: [], error: []});
})

app.post('/api/v1/boocamps', (req, res) => {
    res.status(200).json({success: true, msg: "Create new bootcamp", data: [], error: []});
})

app.put('/api/v1/boocamps/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`, data: [], error: []});
})

app.delete('/api/v1/boocamps/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Delete bootcamp ${req.params.id}`, data: [], error: []});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
