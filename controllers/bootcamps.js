// @desc        get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      public
getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: "Show all bootcamps", data: [], error: []});
}

// @desc        get specific bootcamps/:id
// @route       GET /api/v1/bootcamps
// @access      public
getBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Show bootcamp ${req.params.id}`, data: [], error: []});
}

// @desc        create a bootcamps
// @route       POST /api/v1/bootcamps
// @access      private
createBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: "Create new bootcamp", data: [], error: []});
}

// @desc        update specific bootcamps
// @route       PUT /api/v1/bootcamps/:id
// @access      private
updateBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`, data: [], error: []});
}

// @desc        delete specific bootcamps
// @route       DELETE /api/v1/bootcamps/:id
// @access      private
deleteBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: `Delete bootcamp ${req.params.id}`, data: [], error: []});
}

module.exports = {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamps,
    deleteBootcamps
}