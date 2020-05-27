const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const Course = require("../models/Course");

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require("../middleware/advancedResults");

router.route("/").get(advancedResults(Course, { path: 'bootcamp', select: 'name description' }), getCourses).post(protect, authorize('publisher', 'admin'), addCourse);

// router.route("/:bootcampId/courses").get(getCourses);

router.route("/:id").get(getCourse).put(protect, authorize('publisher', 'admin'), updateCourse).delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
