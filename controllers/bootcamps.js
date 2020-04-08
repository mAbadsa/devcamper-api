const BootCamp = require("../models/Bootcamp");

// @desc        get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      public
getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await BootCamp.find();
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps, errors: [] });
  } catch (error) {
    res.status(400).json({ success: false, data: [], errors: [error] });
  }
};

// @desc        get specific bootcamps/:id
// @route       GET /api/v1/bootcamps
// @access      public
getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findById(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, data: [], errors: ["Bootcamp Not Found!"] });
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
      errors: [],
    });
  } catch (error) {
    res.status(400).json({ success: false, data: [], errors: [error] });
  }
};

// @desc        create a bootcamps
// @route       POST /api/v1/bootcamps
// @access      private
createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
      errors: []
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: [error],
    });
  }
};

// @desc        update specific bootcamps
// @route       PUT /api/v1/bootcamps/:id
// @access      private
updateBootcamps = async (req, res, next) => {
  try {
    const updatedBootcamp = await BootCamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedBootcamp) {
      return res.status(404).json({
        success: false,
        data: [],
        errors: ["Bootcamp Not Found!"],
      });
    }
    res.status(200).json({
      success: true,
      data: updatedBootcamp,
      errors: [],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: [error],
    });
  }
};

// @desc        delete specific bootcamps
// @route       DELETE /api/v1/bootcamps/:id
// @access      private
deleteBootcamps = async (req, res, next) => {
  try {
    const deletedBootcamp = await BootCamp.findByIdAndDelete(req.params.id);
    if (!deletedBootcamp) {
      return res
        .status(404)
        .json({ success: true, data: [], errors: ["Bootcamp not found!"] });
    }
    res.status(200).json({
      success: true,
      data: deletedBootcamp,
      errors: [],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: [error],
    });
  }
};

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamps,
  deleteBootcamps,
};
