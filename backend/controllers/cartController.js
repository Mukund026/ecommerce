const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const { successResponse } = require("../utils/successResponse");

// Get user cart
exports.getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");
  successResponse(res, 200, user.cart, "Cart fetched successfully");
});

// Add item to cart
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const user = await User.findById(req.user._id);

  // Check if product already in cart
  const existingItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    // Update quantity if already in cart
    existingItem.quantity += quantity;
  } else {
    // Add new item to cart
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  
  // Populate the cart to return full product details
  const updatedUser = await User.findById(req.user._id).populate("cart.product");
  successResponse(res, 200, updatedUser.cart, "Item added to cart successfully");
});

// Remove item from cart
exports.removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();
  
  const updatedUser = await User.findById(req.user._id).populate("cart.product");
  successResponse(res, 200, updatedUser.cart, "Item removed from cart successfully");
});

// Update cart item quantity
exports.updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const user = await User.findById(req.user._id);

  const cartItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (!cartItem) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
  } else {
    cartItem.quantity = quantity;
  }

  await user.save();
  
  const updatedUser = await User.findById(req.user._id).populate("cart.product");
  successResponse(res, 200, updatedUser.cart, "Cart updated successfully");
});

// Clear cart
exports.clearCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = [];
  await user.save();
  successResponse(res, 200, [], "Cart cleared successfully");
});

