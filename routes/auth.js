const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  register,
  login,
  getMe,
  forgetPassword,
  resetPassword,
  updateUserDetails,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/me").get(protect, getMe);

router.route("/updateuserdetails").put(protect, updateUserDetails);

router.route("/forgotpassword").post(forgetPassword);

router.route("/resetpassword/:resettoken").put(resetPassword);

module.exports = router;
