const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");

// @desc        Get all reviews
// @route       GET /api/v1/reviews
// @route       GET /api/v1/bootcamps/:bootcampId/reviews
// @access      public
const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
      errors: [],
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc        Get specific reviews
// @route       GET /api/v1/reviews/:reviewId
// @access      public
const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    return next(
      new ErrorResponse(
        `Can't found review with id ${req.params.reviewId}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: review,
    errors: [],
  });
});

// @desc        Add review
// @route       POST /api/v1/bootcamps/:bootcampId/reviews
// @access      Private
const addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp with id ${req.params.bootcampId}`, 404)
    );
  }

  if (!bootcamp.user.toString() === req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to add new Review to Bootcamp with id ${bootcamp._id}`,
        401
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(200).json({
    success: true,
    data: review,
    errors: [],
  });
});

module.exports = {
  getReviews,
  getReview,
  addReview,
};
