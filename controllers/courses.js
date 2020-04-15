const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Course = require("../models/Course");

getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
    errors: [],
  });
});

getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    new ErrorResponse(`Couser notfound with id of ${req.params.id}`, 404);
  }

  res.status(200).json({
    success: true,
    data: course,
    errors: [],
  });
});

createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);
  res.status(200).json({
    success: true,
    data: course,
    errors: [],
  });
});

updateCourse = asyncHandler(async (req, res, next) => {
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCourse) {
    new ErrorResponse(`Course not found with id of ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    data: updatedCourse,
    errors: [],
  });
});

deleteCourse = asyncHandler(async (req, res, next) => {
  const deletedCourse = await Course.findByIdAndDelete(req.params.id);
  if (!deletedCourse) {
    new ErrorResponse(`Course not found with id of ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    data: deletedCourse,
    errors: [],
  });
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
