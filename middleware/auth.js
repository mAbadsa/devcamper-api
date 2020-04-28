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
    token = req.headers.authorization.split(" ")[1];
  }
  // Another logic
  // else if (req.cookie.token) {
  //     token = req.cookie.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new errorRespone("Not authorized to access this route", 401));
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new errorRespone("Not authorized to access this route", 401));
  }
});

module.exports = { protect };
