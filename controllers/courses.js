const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

// @desc        get all courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @access      public
getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
      errors: [],
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc        get specific course by id
// @route       GET /api/v1/courses/:id
// @access      public
getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course,
    errors: [],
  });
});

// @desc        Add a course
// @route       POST /api/v1/bootcamps/:bootcampId/courses
// @access      private
addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to add new Course to Bootcamp with id ${bootcamp._id}`,
        401
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
    errors: [],
  });
});

// @desc        update specific course
// @route       PUT /api/v1/courses/:Id
// @access      private
updateCourse = asyncHandler(async (req, res, next) => {
  let updatedCourse = await Course.findById(req.params.id);

  if (!updatedCourse) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`)
    );
  }

  // Make sure user is bootcamp owner
  if (
    updatedCourse.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to update course with id ${updatedCourse._id}`,
        401
      )
    );
  }

  updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: updatedCourse,
    errors: [],
  });
});

// @desc        delete specific course
// @route       DELETE /api/v1/courses/:id
// @access      private
deleteCourse = asyncHandler(async (req, res, next) => {
  const deletedCourse = await Course.findById(req.params.id);
  if (!deletedCourse) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`)
    );
  }

  // Make sure user is bootcamp owner
  if (
    deletedCourse.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to delete Course with id ${deletedCourse._id}`,
        401
      )
    );
  }

  await deletedCourse.remove();

  res.status(200).json({
    success: true,
    data: deletedCourse,
    errors: [],
  });
});

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
