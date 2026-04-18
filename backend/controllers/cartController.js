const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const { successResponse } = require("../utils/successResponse");

function extractPrice(priceStr) {
  if (!priceStr) return 0;
  const match = priceStr.match(/₹\\s?([\\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, "")) : 0;
}

function extractOriginalPrice(priceStr) {
  if (!priceStr) return null;
  const matches = priceStr.match(/₹\\s?[\d,]+/g);
  if (matches && matches.length > 1) {
    return parseInt(matches[1].replace(/[₹,]/g, ""));
  }
  return null;
}

const formatProduct = (product) => ({
  _id: product._id,
  name: product.names,
  image: Array.isArray(product.images_links) ? product.images_links[0] : product.images_links,
  price: extractPrice(product.price_details),
  originalPrice: extractOriginalPrice(product.price_details),
  rating: product.stars,
  reviews: product["rating&reviews"]
});

// Get user cart
exports.getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product", "names images_links price_details stars \"rating&reviews\"").lean();

  const formattedCart = user.cart.map(item => ({
    ...item,
    product: formatProduct(item.product)
  }));

  successResponse(res, 200, formattedCart, "Cart fetched successfully");
});

// Add item to cart
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const user = await User.findById(req.user._id);

  const existingItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();

  const updatedUser = await User.findById(req.user._id).populate("cart.product", "names images_links price_details stars \"rating&reviews\"").lean();

  const formattedCart = updatedUser.cart.map(item => ({
    ...item,
    product: formatProduct(item.product)
  }));

  successResponse(res, 200, formattedCart, "Item added to cart successfully");
});

// Remove item from cart
exports.removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();

  const updatedUser = await User.findById(req.user._id).populate("cart.product", "names images_links price_details stars \"rating&reviews\"").lean();

  const formattedCart = updatedUser.cart.map(item => ({
    ...item,
    product: formatProduct(item.product)
  }));

  successResponse(res, 200, formattedCart, "Item removed from cart successfully");
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
    user.cart = user.cart.filter(
      (item) => item.product.toString() === productId
    );
  } else {
    cartItem.quantity = quantity;
  }

  await user.save();

  const updatedUser = await User.findById(req.user._id).populate("cart.product", "names images_links price_details stars \"rating&reviews\"").lean();

  const formattedCart = updatedUser.cart.map(item => ({
    ...item,
    product: formatProduct(item.product)
  }));

  successResponse(res, 200, formattedCart, "Cart updated successfully");
});

// Clear cart
exports.clearCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = [];
  await user.save();
  successResponse(res, 200, [], "Cart cleared successfully");
});
