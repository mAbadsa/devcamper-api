const JWT = require("jsonwebtoken");
const asyncHandlre = require("./async");
const errorRespone = require("../utils/errorResponse");
const User = require("../models/User");

const protect = asyncHandlre(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from  Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }
  // Set token from  cookie
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new errorRespone("Not authorized to access this route", 401));
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new errorRespone("Not authorized to access this route", 401));
  }
});

// Grant access to specific roles

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorRespone(
          `User role ${req.user.role} is not authorized to access this roles`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
