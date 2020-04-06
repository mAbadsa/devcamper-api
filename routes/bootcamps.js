const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({success: true, msg: "Show all bootcamps", data: [], error: []});
})

router.put('/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Show bootcamp ${req.params.id}`, data: [], error: []});
})

router.post('/', (req, res) => {
    res.status(200).json({success: true, msg: "Create new bootcamp", data: [], error: []});
})

router.put('/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`, data: [], error: []});
})

router.delete('/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Delete bootcamp ${req.params.id}`, data: [], error: []});
})

module.exports = router;