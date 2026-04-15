const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const { successResponse } = require("../utils/successResponse");

// ==============================
// CREATE PRODUCT
// ==============================
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, price, categoryName, description, image } = req.body;

  const productData = {
    name,
    price,
    categoryName,
    description,
    image
  };

  if (req.user?.role === "seller") {
    productData.seller = req.user._id;
  }

  const product = await Products.create(productData);
  successResponse(res, 201, product, "Product created successfully");
});

// ==============================
// DELETE PRODUCT
// ==============================
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  successResponse(res, 200, product, "Product deleted");
});

// ==============================
// UPDATE PRODUCT
// ==============================
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  successResponse(res, 200, product, "Product updated successfully");
});

// ==============================
// GET PRODUCTS
// ==============================
exports.getProduct = asyncHandler(async (req, res) => {
  let {
    category,
    categoryName,
    subcategory,
    search,
    page = 1,
    limit = 20,
    sort = "newest",
    type
  } = req.query;

  const finalCategory = category || categoryName;
  const query = {};

  // Normalize type
  type = type?.toLowerCase()?.trim();
  console.log("TYPE RECEIVED:", type);

  // ==============================
  // GROCERY TYPE MAP (NEW ADDITION)
  // ==============================
  const groceryTypeMap = {
    fruits: /fruit|vegetables|apple|banana|tomato|carrot|veg/i,
    "oil-ghee": /oil|ghee|mustard oil|sunflower oil|refined oil|desi ghee/i,
    "rice-atta-dal": /rice|atta|flour|dal|lentil|basmati|wheat/i,
    "milk-dairy": /milk|curd|butter|paneer|cheese|yogurt|dairy/i,
    "bakery-bread": /bread|cake|bun|bakery|rusk|toast|cookies/i,
    "eggs-meat-fish": /egg|chicken|mutton|fish|meat|poultry/i,
    "spices-seasonings": /spice|masala|salt|pepper|turmeric|chilli|cumin/i,
    "snacks-biscuits": /snack|chips|biscuit|namkeen|kurkure|lays|cracker/i
  };

  // ==============================
  // EXISTING TYPE LOGIC (UNCHANGED)
  // ==============================

  if (type === "atta-flour") {
    query.title = { $regex: "atta|flour", $options: "i" };
  }

  if (type === "rice") {
    query.title = { $regex: "\\b(rice|basmati|sona masoori|brown rice)\\b", $options: "i" };
  }

  if (type === "whole-grains" || type === "whole grains") {
    query.categoryName = "Grocery";
    query.$or = [
      { title: /wheat|atta|oats|millet|quinoa|barley|multigrain|ragi/i },
      { name: /wheat|atta|oats|millet|quinoa|barley|multigrain|ragi/i }
    ];
  }

  if (type === "poha") {
    query.title = { $regex: "\\b(poha|flattened rice|avalakki|chiwda|pohe)\\b", $options: "i" };
  }

  if (type === "millet") {
    query.title = { $regex: "\\b(millet|ragi|bajra|jowar|nachni)\\b", $options: "i" };
  }

  if (type === "tea-coffee-drinks") {
    query.title = { $regex: "\\b(tea|coffee|juice|drink|beverage)\\b", $options: "i" };
  }

  if (type === "chips-biscuits") {
    query.title = { $regex: "\\b(chips|biscuits|cookies|snacks)\\b", $options: "i" };
  }

  if (type === "bath") {
    query.categoryName = { $regex: /personal care|bath/i };
    query.$or = [
      { title: /soap|shampoo|lotion|bodywash/i },
      { name: /soap|shampoo|lotion|bodywash/i }
    ];
  }

  if (type === "organic") {
    query.categoryName = "Grocery";
    query.$or = [
      { title: /organic|natural|eco/i },
      { name: /organic|natural|eco/i }
    ];
  }

  if (type === "supersaver") {
    query.categoryName = "Grocery";
    query.price = { $lte: 100 };
  }

  if (type === "featured") {
    query.categoryName = "Grocery";
    query.$and = [
      { stars: { $gte: 4 } },
      { reviews: { $gte: 50 } }
    ];
  }

  // ==============================
  // NEW GROCERY TYPES (SAFE ADD)
  // ==============================
  if (groceryTypeMap[type]) {
    query.categoryName = "Grocery";

    const conditions = [
      { title: { $regex: groceryTypeMap[type] } },
      { name: { $regex: groceryTypeMap[type] } }
    ];

    query.$or = query.$or ? [...query.$or, ...conditions] : conditions;
  }

  // ==============================
  // CATEGORY & SUBCATEGORY
  // ==============================
  if (finalCategory && !groceryTypeMap[type]) {
    query.categoryName = finalCategory.trim();
  }

  if (subcategory) {
    query.subcategory = subcategory.trim();
  }

  // ==============================
  // SEARCH (SAFE)
  // ==============================
  if (
    search &&
    search.trim() &&
    !groceryTypeMap[type]
  ) {
    query.$text = { $search: search.trim() };
  }

  // ==============================
  // PAGINATION
  // ==============================
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

  const total = await Products.countDocuments(query);

  // ==============================
  // SORTING
  // ==============================
  const sortMap = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    "stars-desc": { stars: -1 },
    "newest": { createdAt: -1 }
  };

  const products = await Products.find(query)
    .select("title name price imgUrl image stars reviews categoryName")
    .sort(sortMap[sort] || { createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .lean();

  res.json({
    success: true,
    products,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
    hasNext: pageNum * limitNum < total,
    hasPrev: pageNum > 1
  });
});

// ==============================
// GET SINGLE PRODUCT
// ==============================
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id).lean();

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  successResponse(res, 200, product, "Product fetched successfully");
});

// ==============================
// REDIRECT
// ==============================
exports.getRiceProducts = asyncHandler(async (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&search=rice&limit=50`);
});