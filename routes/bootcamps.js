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

const { protect } = require('../middleware/auth');

const BootCamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

// Include other resource router
const courseRouter = require("./courses");

// Re-route into other resource router
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(BootCamp, "courses"), getBootcamps)
  .post(protect, createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamps)
  .delete(protect, deleteBootcamps);

router.route("/radius/:zipcode/:distance/:unit").get(getBootcampsInRadius);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

module.exports = router;
