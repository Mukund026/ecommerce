const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const sellerMiddleware = require("../middleware/sellerMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const { getDashboardStats } = require("../controllers/adminController");
const express = require("express");
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct, getProductById, getRiceProducts } = require("../controllers/productController");
const { seedProducts, resetSeedProducts } = require("../controllers/seedController");

// Seed routes - for development only (no auth required)
router.get("/seed", seedProducts);
router.get("/seed/reset", resetSeedProducts);
router.post("/", protect, adminOnly, createProduct);
router.get("/", getProduct);
router.get("/:id", getProductById);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// Seller routes - create product
router.post("/seller", protect, sellerMiddleware, createProduct);

// Seller routes - get seller's products
router.get("/seller/my-products", protect, sellerMiddleware, asyncHandler(async (req, res) => {
  const Products = require("../models/Product");
  const { successResponse } = require("../utils/successResponse");

  const products = await Products.find({ seller: req.user._id });
  successResponse(res, 200, products, "Seller products fetched successfully");
}));

// Seller routes - update own product
router.put("/seller/:id", protect, sellerMiddleware, asyncHandler(async (req, res) => {
  const Products = require("../models/Product");
  const { successResponse } = require("../utils/successResponse");

  const product = await Products.findOne({ _id: req.params.id, seller: req.user._id });
  if (!product) {
    return res.status(404).json({ message: "Product not found or not authorized" });
  }

  const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
  successResponse(res, 200, updatedProduct, "Product updated successfully");
}));

// Seller routes - delete own product
router.delete("/seller/:id", protect, sellerMiddleware, asyncHandler(async (req, res) => {
  const Products = require("../models/Product");
  const { successResponse } = require("../utils/successResponse");

  const product = await Products.findOne({ _id: req.params.id, seller: req.user._id });
  if (!product) {
    return res.status(404).json({ message: "Product not found or not authorized" });
  }

  await Products.findByIdAndDelete(req.params.id);
  successResponse(res, 200, null, "Product deleted successfully");
}));


// Category-specific shortcuts (redirect to main query)
router.get('/fresh', (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/computers', (req, res) => {
  res.redirect(`/api/products?categoryName=Computers${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/books', (req, res) => {
  res.redirect(`/api/products?categoryName=Books${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion', (req, res) => {
  res.redirect(`/api/products?categoryName=Fashion${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/toys', (req, res) => {
  res.redirect(`/api/products?categoryName=Toys${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fresh/atta-flours', (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&type=atta-flour&page=1&limit=20`);
});
router.get('/fresh/wholegrain', (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&type=wholegrain&page=1&limit=20`);
});
router.get('/fresh/poha', (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&type=poha&page=1&limit=20`);
});
router.get('/fresh/millet-other', (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&type=millet-other=1&limit=20`);
});
router.get('/fresh/tea-coffee-drink-mixes', (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&type=tea-coffee-drinks&page=1&limit=20`);
});
router.get('/fresh/chips-biscuits', (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&type=chips-biscuits&page=1&limit=20`);
});

router.get('/products/rice', getRiceProducts);

module.exports = router;
