const express = require("express");
const router = express.Router({ mergeParams: true });

const { getReviews } = require("../controllers/reviews");

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
// router.route("/:bootcampId/courses").get(getCourses);

// router.route("/:id").get(getCourse).put(protect, authorize('publisher', 'admin'), updateCourse).delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
