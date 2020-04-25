const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

// @desc        Register user
// @route       POST /api/v1/auth/register
// @access      public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });

  // await user.save();

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token: token,
    data: user,
    errors: [],
  });
});

// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return next(
      new ErrorResponse('Please provide an email and password', 400)
    );
  }

  const user =  await User.findOne({ email }).select('+password');

  if(!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
    data: [],
    errors: []
  })
})

module.exports = {
  register,
  login
};
