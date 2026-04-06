const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const { successResponse } = require("../utils/successResponse");
const Order = require("../models/Order");

exports.createOrder = asyncHandler(async (req, res) => {
  for(let item of req.body.products) {
    const product = await Product.findById(item.product);
    if(product.countInStock < item.quantity) {
      throw new Error(`Product ${product.name} is out of stock`);
    }
    product.countInStock -= item.quantity;
    await product.save();
  }
  const order = await Order.create({
    user: req.user._id,
    products: req.body.products,
    totalPrice: req.body.totalPrice
  });

  successResponse( res, 201, order, "Order Placed Successfully");
});

  exports.getMyOrders = asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id});
    res.populate("user", "name email");
    successResponse( res, 201, order, "Orders Fetched Successfully");
  });

  exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    order.status = req.body.status;
    await order.save();
    successResponse( res, 201, order, "Order Status Updated Successfully");
  });