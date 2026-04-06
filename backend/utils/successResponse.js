exports.successResponse = (res, statusCode, data, message = "success") => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

exports.errorResponse = (res, statusCode, message = "error") => {
  res.status(statusCode).json({
    success: false,
    message
  });
};