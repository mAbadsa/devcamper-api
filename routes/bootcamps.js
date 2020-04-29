const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const { protect, authorize } = require('../middleware/auth');

const BootCamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

// Include other resource router
const courseRouter = require("./courses");

// Re-route into other resource router
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(BootCamp, "courses"), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamps)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamps);

router.route("/radius/:zipcode/:distance/:unit").get(getBootcampsInRadius);

router.route("/:id/photo").put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

module.exports = router;
