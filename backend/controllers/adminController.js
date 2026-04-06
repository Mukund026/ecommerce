const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const asyncHandler = require("../middleware/asyncHandler");
const { successResponse } = require("../utils/successResponse");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const user = await User.countDocuments();
  const product = await Product.countDocuments();
  const order = await Order.countDocuments();
  successResponse( res, 200, { user, product, order }, "Admin Stats");
});