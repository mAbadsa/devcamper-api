const asyncHandler = (fn) => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next);

module.exports = asyncHandler;

// function asyncHandler (fun) {
//   return async (req, res, next) => {
//     try {
//       return Promise.resolve(fun(req, res, next));
//     }
//     catch (next) {
//       return next(next);
//     }
//   }
// }