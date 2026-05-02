const User = require("../models/User");
const mongoose = require("mongoose");
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

const formatProduct = (product) => {
  if (!product) return null;

  // Support both old CSV-style field names and the Product model field names
  const name = product.names || product.name || product.title || 'Product';
  const image = Array.isArray(product.images_links)
    ? product.images_links[0]
    : (product.images_links || product.image || product.imgUrl || '/api/placeholder-image.jpg');

  // Price may already be a Number (Product model) or a string (CSV data)
  let price = 0;
  if (typeof product.price === 'number') {
    price = product.price;
  } else if (product.price) {
    price = parseFloat(product.price);
  } else {
    price = extractPrice(product.price_details);
  }

  let originalPrice = null;
  if (typeof product.listPrice === 'number') {
    originalPrice = product.listPrice;
  } else if (product.listPrice) {
    originalPrice = parseFloat(product.listPrice);
  } else {
    originalPrice = extractOriginalPrice(product.price_details);
  }

  return {
    _id: product._id,
    name,
    image,
    price,
    originalPrice,
    rating: product.stars,
    reviews: product["rating&reviews"] || product.reviews
  };
};

// Get user cart
exports.getCart = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized - invalid user" });
  }
  const userIdStr = req.user._id.toString();
  const user = await User.findById(userIdStr).populate("cart.product", "name title image imgUrl price listPrice stars reviews").lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const formattedCart = user.cart.map(item => ({
    ...item,
    product: formatProduct(item.product)
  }));

  successResponse(res, 200, formattedCart, "Cart fetched successfully");
});

// Add item to cart
exports.addToCart = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized - invalid user" });
  }
  const { productId, quantity = 1 } = req.body;
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }
  const userIdStr = req.user._id.toString();
  const user = await User.findById(userIdStr);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const existingItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();

  const updatedUser = await User.findById(req.user._id).populate("cart.product", "name title image imgUrl price listPrice stars reviews").lean();

  const formattedCart = updatedUser.cart.map(item => ({
    ...item,
    product: formatProduct(item.product)
  }));

  successResponse(res, 200, formattedCart, "Item added to cart successfully");
});

// Remove item from cart
exports.removeFromCart = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { productId } = req.params;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.cart = user.cart.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();

  const updatedUser = await User.findById(req.user._id).populate("cart.product", "name title image imgUrl price listPrice stars reviews").lean();

  const formattedCart = updatedUser.cart.map(item => ({
    ...item,
    product: formatProduct(item.product)
  }));

  successResponse(res, 200, formattedCart, "Item removed from cart successfully");
});

// Update cart item quantity
exports.updateCartItem = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { productId } = req.params;
  const { quantity } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

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

  const updatedUser = await User.findById(req.user._id).populate("cart.product", "name title image imgUrl price listPrice stars reviews").lean();

  const formattedCart = updatedUser.cart.map(item => ({
    ...item,
    product: formatProduct(item.product)
  }));

  successResponse(res, 200, formattedCart, "Cart updated successfully");
});

// Clear cart
exports.clearCart = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.cart = [];
  await user.save();
  successResponse(res, 200, [], "Cart cleared successfully");
});
