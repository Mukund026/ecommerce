const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const sellerMiddleware = require("../middleware/sellerMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const { getDashboardStats } = require("../controllers/adminController");
const express = require("express");
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct, getProductById, getRiceProducts } = require("../controllers/productController");

// ============================================================
// CATEGORY-SPECIFIC ROUTES FOR HOME PAGE (must be BEFORE /:id)
// ============================================================
router.get('/bestsellers', asyncHandler(async (req, res) => {
  const Products = require("../models/Product");
  const { successResponse } = require("../utils/successResponse");
  
  // Get bestsellers from non-book categories to provide variety
  let products = await Products.find({ 
      isBestSeller: true,
      categoryName: { $not: /^Books/ }
    })
    .sort({ stars: -1, reviews: -1 })
    .limit(10)
    .lean();
  
  // If not enough bestsellers, also include from other categories
  if (products.length < 5) {
    const moreProducts = await Products.find({ 
        isBestSeller: true,
        categoryName: { $regex: /Grocery|Household|Beauty|Home|Kitchen|Fashion|Electronics/i }
      })
      .sort({ stars: -1, reviews: -1 })
      .limit(10)
      .lean();
    
    const combined = [...products, ...moreProducts];
    products = combined.filter((v,i,a)=>a.findIndex(t=>(t._id.toString()===v._id.toString()))===i);
  }
  
  // Map fields to match frontend expectations
  const mappedProducts = products.slice(0, 10).map(p => ({
    _id: p._id,
    name: p.title || p.name,
    image: p.imgUrl || p.image,
    price: p.price,
    originalPrice: p.listPrice,
    weight: p.subcategory || '',
    category: p.categoryName
  }));
  
  successResponse(res, 200, mappedProducts, "Bestseller products fetched successfully");
}));

router.get('/fresh-fruits', asyncHandler(async (req, res) => {
  const Products = require("../models/Product");
  const { successResponse } = require("../utils/successResponse");
  
  // Get grocery items - food, snacks, beverages, etc.
  let products = await Products.find({ 
      categoryName: "Grocery"
    })
    .limit(10)
    .lean();
  
  // Map fields to match frontend expectations
  const mappedProducts = products.slice(0, 10).map(p => ({
    _id: p._id,
    name: p.title || p.name,
    image: p.imgUrl || p.image,
    price: p.price,
    originalPrice: p.listPrice,
    weight: p.subcategory || '',
    category: p.categoryName
  }));
  
  successResponse(res, 200, mappedProducts, "Fresh fruits fetched successfully");
}));

router.get('/snacks-beverages', asyncHandler(async (req, res) => {
  const Products = require("../models/Product");
  const { successResponse } = require("../utils/successResponse");
  
  // Use categoryName filter - exclude books
  let products = await Products.find({
    categoryName: { 
      $in: [
        "Grocery", 
        "Coffee, Tea  Espresso",
        "Breakfast Cereal",
        "Household Supplies",
        "Home  Kitchen"
      ],
      $not: /^Books/
    }
  })
    .limit(10)
    .lean();
  
  if (products.length < 5) {
    // Fallback: Get products from grocery category only (excludes books)
    products = await Products.find({ 
      categoryName: "Grocery"
    }).limit(10).lean();
  }
  
  // Map fields to match frontend expectations
  const mappedProducts = products.slice(0, 10).map(p => ({
    _id: p._id,
    name: p.title || p.name,
    image: p.imgUrl || p.image,
    price: p.price,
    originalPrice: p.listPrice,
    weight: p.subcategory || '',
    category: p.categoryName
  }));
  
  successResponse(res, 200, mappedProducts, "Snacks and beverages fetched successfully");
}));

router.get('/house-essentials', asyncHandler(async (req, res) => {
  const Products = require("../models/Product");
  const { successResponse } = require("../utils/successResponse");
  
  // Use proper household categories - exclude books
  let products = await Products.find({
    categoryName: { 
      $in: [
        "Household Cleaning", 
        "Household Supplies",
        "Household Cleaning Tools",
        "Laundry Supplies",
        "Vacuums  Floor Care",
        "Bath  Body",
        "Hair Care",
        "Skin Care Products"
      ],
      $not: /^Books/
    }
  })
    .limit(10)
    .lean();
  
  if (products.length < 5) {
    // Fallback: Get from household category if not enough
    products = await Products.find({ 
      categoryName: { $regex: /Household|Cleaning|Laundry/i }
    }).limit(10).lean();
  }
  
  // Map fields to match frontend expectations
  const mappedProducts = products.slice(0, 10).map(p => ({
    _id: p._id,
    name: p.title || p.name,
    image: p.imgUrl || p.image,
    price: p.price,
    originalPrice: p.listPrice,
    weight: p.subcategory || '',
    category: p.categoryName
  }));
  
  successResponse(res, 200, mappedProducts, "House essentials fetched successfully");
}));

// ============================================================
// CATEGORY-SPECIFIC SHORTCUTS
// ============================================================
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

// ============================================================
// WOMEN'S FASHION ROUTES
// ============================================================
router.get('/fashion/women', (req, res) => {
  res.redirect(`/api/products?categoryName=Women${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/women-accessories', (req, res) => {
  res.redirect(`/api/products?categoryName=Women's Accessories${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/women-clothing', (req, res) => {
  res.redirect(`/api/products?categoryName=Women's Clothing${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/women-handbags', (req, res) => {
  res.redirect(`/api/products?categoryName=Women's Handbags${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/women-health', (req, res) => {
  res.redirect(`/api/products?categoryName=Women's Health  Family Planning${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/women-jewelry', (req, res) => {
  res.redirect(`/api/products?categoryName=Women's Jewelry${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/women-shoes', (req, res) => {
  res.redirect(`/api/products?categoryName=Women's Shoes${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/women-watches', (req, res) => {
  res.redirect(`/api/products?categoryName=Women's Watches${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});

// ============================================================
// MEN'S FASHION ROUTES
// ============================================================
router.get('/fashion/men', (req, res) => {
  res.redirect(`/api/products?categoryName=Men${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/men-accessories', (req, res) => {
  res.redirect(`/api/products?categoryName=Men's Accessories${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/men-clothing', (req, res) => {
  res.redirect(`/api/products?categoryName=Men's Clothing${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/men-jewelry', (req, res) => {
  res.redirect(`/api/products?categoryName=Men's Jewelry${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/men-shoes', (req, res) => {
  res.redirect(`/api/products?categoryName=Men's Shoes${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/men-watches', (req, res) => {
  res.redirect(`/api/products?categoryName=Men's Watches${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});

// ============================================================
// OTHER FASHION ROUTES
// ============================================================
router.get('/fashion/sporting-apparel', (req, res) => {
  res.redirect(`/api/products?categoryName=Sporting Apparel${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/sport-clothing', (req, res) => {
  res.redirect(`/api/products?categoryName=Sport Specific Clothing${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/shaving-hair-removal', (req, res) => {
  res.redirect(`/api/products?categoryName=Shaving  Hair Removal Products${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/shelf-brackets', (req, res) => {
  res.redirect(`/api/products?categoryName=Shelf Brackets  Supports${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/jewelry-accessories', (req, res) => {
  res.redirect(`/api/products?categoryName=Shoe, Jewelry  Watch Accessories${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/perfume', (req, res) => {
  res.redirect(`/api/products?categoryName=Perfume  Cologne${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/kids', (req, res) => {
  res.redirect(`/api/products?categoryName=Kids${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/bags-luggage', (req, res) => {
  res.redirect(`/api/products?categoryName=Luggage  Travel Gear${req.url.includes('?') ? '&' : '?'}page=1&limit=20`);
});
router.get('/fashion/deals', (req, res) => {
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

router.get('/fresh/fruits-vegetables', (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&type=fruits-vegetables&page=1&limit=20`);
});

router.get('/fresh/milk-dairy', (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&type=milk-dairy&page=1&limit=20`);
});

router.get('/fresh/household', asyncHandler(async (req, res) => {
  const Products = require("../models/Product");
  const { successResponse } = require("../utils/successResponse");
  
  // Get products from all household-related categories
  const products = await Products.find({
    categoryName: { 
      $in: [
        "Household Cleaning", 
        "Household Supplies",
        "Household Cleaning Tools",
        "Laundry Supplies",
        "Bath & Body",
        "Hair Care",
        "Skin Care Products",
        "Home & Kitchen"
      ]
    }
  })
  .limit(20)
  .lean();
  
  const mappedProducts = products.slice(0, 20).map(p => ({
    _id: p._id,
    name: p.title || p.name,
    image: p.imgUrl || p.image,
    price: p.price,
    originalPrice: p.listPrice,
    weight: p.subcategory || '',
    category: p.categoryName
  }));
  
  successResponse(res, 200, mappedProducts, "Household products fetched successfully");
}));

router.get('/products/rice', getRiceProducts);

// ============================================================
// MAIN CRUD ROUTES (must be AFTER specific routes)
// ============================================================
router.post("/", protect, adminOnly, createProduct);
router.get("/", getProduct);
router.get("/:id", getProductById);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// ============================================================
// SELLER ROUTES
// ============================================================
router.post("/seller", protect, sellerMiddleware, createProduct);

router.get("/seller/my-products", protect, sellerMiddleware, asyncHandler(async (req, res) => {
  const Products = require("../models/Product");
  const { successResponse } = require("../utils/successResponse");

  const products = await Products.find({ seller: req.user._id });
  successResponse(res, 200, products, "Seller products fetched successfully");
}));

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

module.exports = router;
