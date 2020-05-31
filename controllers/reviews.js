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
    return next(new ErrorResponse(`Can't found review with id ${req.params.reviewId}`, 404));
  }

  res.status(200).json({
    success: true,
    data: review,
    errors: [],
  });
});

module.exports = {
  getReviews,
  getReview,
};
