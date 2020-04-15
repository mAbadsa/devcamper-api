const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const BootCamp = require("../models/Bootcamp");

// @desc        get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      public
getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  let reqQuery = { ...req.query };

  // Fields to exclude
  removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);
  // console.log(reqQuery);
  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $lt, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = BootCamp.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("_createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await BootCamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Execution query
  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
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

// @desc        Get bootcamps within a radius
// @route       GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access      private
getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance, unit } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calculate radius using radians
  // Divide dist by radius of Earth
  // Earth Radius 3.963 mi, 6,378 km
  const radiusMi = distance / 3963;
  const radiusKm = distance / 6378;
  let radius;
  if (unit === "mile") {
    radius = radiusMi;
  } else {
    radius = radiusKm;
  }

  const bootcamps = await BootCamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
    errors: [],
  });
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
};
