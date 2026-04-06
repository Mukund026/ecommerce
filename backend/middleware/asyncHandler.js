const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

// Tis is used to remove try catch block from controllers and handle all errors in one place (error handling middleware)