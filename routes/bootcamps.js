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

// Include other resource router
const courseRouter = require("./courses");

// Re-route into other resource router
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

router.route("/radius/:zipcode/:distance/:unit").get(getBootcampsInRadius);

router.route("/:id/photo").put(bootcampPhotoUpload);

module.exports = router;
