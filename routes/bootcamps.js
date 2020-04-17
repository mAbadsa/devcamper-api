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

const BootCamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

// Include other resource router
const courseRouter = require("./courses");

// Re-route into other resource router
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(BootCamp, "courses"), getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

router.route("/radius/:zipcode/:distance/:unit").get(getBootcampsInRadius);

router.route("/:id/photo").put(bootcampPhotoUpload);

module.exports = router;
