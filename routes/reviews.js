const express = require("express");
const router = express.Router({ mergeParams: true });

const { getReviews, getReview } = require("../controllers/reviews");

const Reviews = require("../models/Review");

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(
    advancedResults(Reviews, { path: "bootcamp", select: "name description" }),
    getReviews
  );
/*.post(protect, authorize('publisher', 'admin'), addCourse);
 */
router.route("/:reviewId").get(getReview);

// router.route("/:id").get(getCourse).put(protect, authorize('publisher', 'admin'), updateCourse).delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
