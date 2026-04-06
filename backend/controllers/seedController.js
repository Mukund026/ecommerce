const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const { successResponse } = require("../utils/successResponse");

const seedProducts = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
  },
  {
    name: "Smart Watch",
    price: 199.99,
    category: "Electronics",
    description: "Feature-rich smartwatch with fitness tracking",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
  },
  {
    name: "Running Shoes",
    price: 79.99,
    category: "Sports",
    description: "Comfortable running shoes with excellent grip",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
  },
  {
    name: "Laptop Backpack",
    price: 49.99,
    category: "Accessories",
    description: "Durable laptop backpack with multiple compartments",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
  },
  {
    name: "Coffee Maker",
    price: 89.99,
    category: "Home",
    description: "Automatic coffee maker with timer",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400"
  },
  {
    name: "Desk Lamp",
    price: 34.99,
    category: "Home",
    description: "LED desk lamp with adjustable brightness",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"
  },
  {
    name: "Bluetooth Speaker",
    price: 59.99,
    category: "Electronics",
    description: "Portable Bluetooth speaker with rich sound",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
  },
  {
    name: "Yoga Mat",
    price: 24.99,
    category: "Sports",
    description: "Non-slip yoga mat for comfortable workouts",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400"
  },
  {
    name: "Water Bottle",
    price: 19.99,
    category: "Sports",
    description: "Insulated water bottle to keep drinks cold",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400"
  },
  {
    name: "Phone Case",
    price: 14.99,
    category: "Accessories",
    description: "Protective phone case with modern design",
    image: "https://images.unsplash.com/photo-1556656793-02774a8c577a?w=400"
  }
];

exports.seedProducts = asyncHandler(async (req, res) => {
  // Check if products already exist
  const existingProducts = await Product.countDocuments();
  
  if (existingProducts > 0) {
    return successResponse(
      res, 
      200, 
      { count: existingProducts }, 
      `Database already has ${existingProducts} products. Use /api/products/seed/reset to reset.`
    );
  }

  // Create products
  const products = await Product.insertMany(seedProducts);
  successResponse(res, 201, products, "Products seeded successfully");
});

exports.resetSeedProducts = asyncHandler(async (req, res) => {
  // Delete all products
  await Product.deleteMany({});
  
  // Insert fresh seed data
  const products = await Product.insertMany(seedProducts);
  successResponse(res, 201, products, "Products reset and seeded successfully");
});

