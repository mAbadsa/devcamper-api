const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const BootCamp = require("../models/Bootcamp");

// @desc        get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      public
getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await BootCamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
    errors: [],
  });
});

// @desc        get specific bootcamps/:id
// @route       GET /api/v1/bootcamps
// @access      public
getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
    errors: [],
  });
});

// @desc        create a bootcamps
// @route       POST /api/v1/bootcamps
// @access      private
createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
    errors: [],
  });
});

// @desc        update specific bootcamps
// @route       PUT /api/v1/bootcamps/:id
// @access      private
updateBootcamps = asyncHandler(async (req, res, next) => {
  const updatedBootcamp = await BootCamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedBootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: updatedBootcamp,
    errors: [],
  });
});

// @desc        delete specific bootcamps
// @route       DELETE /api/v1/bootcamps/:id
// @access      private
deleteBootcamps = asyncHandler(async (req, res, next) => {
  const deletedBootcamp = await BootCamp.findByIdAndDelete(req.params.id);
  if (!deletedBootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: deletedBootcamp,
    errors: [],
  });
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamps,
  deleteBootcamps,
};
