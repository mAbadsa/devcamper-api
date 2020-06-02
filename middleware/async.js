// const asyncHandler = (fn) => (req, res, next) =>
//   Promise.resolve(fn(req, res, next)).catch(next);

function asyncHandler(fun) {
  return async (req, res, next) => {
    try {
      return Promise.resolve(fun(req, res, next));
    } catch (next) {
      return next(next);
    }
  };
}
module.exports = asyncHandler;

// const getMe = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.user.id);
//   if (!user) {
//     if (!isMatch) {
//       return next(
//         new ErrorResponse("Not authorized to access this route", 401)
//       );
//     }
//   }

//   res.status(200).json({
//     success: true,
//     data: user,
//     errors: [],
//   });
// });
