const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const { successResponse } = require("../utils/successResponse");


// ✅ CREATE PRODUCT
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, price, categoryName, description, image } = req.body;

  const productData = {
    name,
    price,
    categoryName,
    description,
    image
  };

  // Add seller if role is seller
  if (req.user?.role === "seller") {
    productData.seller = req.user._id;
  }

  const product = await Products.create(productData);
  successResponse(res, 201, product, "Product created successfully");
});


// ✅ DELETE PRODUCT
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  successResponse(res, 200, product, "Product deleted");
});


// ✅ UPDATE PRODUCT
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Products.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  successResponse(res, 200, product, "Product updated successfully");
});


// ✅ GET PRODUCTS (OPTIMIZED)
exports.getProduct = asyncHandler(async (req, res) => {
  const {
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

  // ✅ Declare FIRST
  const query = {};

  // ✅ Special filter (atta & flour)
  if (type === "atta-flour") {
    query.title = { $regex: "atta|flour", $options: "i" };
  }

  if (type === "rice") {
    query.title = { $regex: "\\b(rice|basmati|sona masoori|brown rice)\\b", $options: "i" };
  }

  if (type === "whole-grains" || type === "whole grains") {
    query.$or = [
      { title: /wheat|atta|oats|millet|quinoa|barley|multigrain|ragi/i },
      { name: /wheat|atta|oats|millet|quinoa|barley|multigrain|ragi/i }
    ];

    query.categoryName = "Grocery";
  }

  if (type === "poha") {
    query.title = { $regex: "\\b(poha|flattened rice|avalakki|chiwda|pohe)\\b", $options: "i" };
  }

  // ✅ Category filter
  if (finalCategory) {
    query.categoryName = finalCategory.trim();
  }

  // ✅ Subcategory
  if (subcategory) {
    query.subcategory = subcategory.trim();
  }

  // ❗ IMPORTANT: Avoid conflict with regex
  if (search && search.trim() && !["atta-flour", "rice", "wholegrain", "whole-grains", "poha", "millet", "tea-coffee-drinks", "chips-biscuits"].includes(type)) {
    query.$text = { $search: search.trim() };
  }

  if (type === "poha") {
    query.title = {
      $regex: "\\b(poha|flattened rice|aval|beaten rice)\\b",
      $options: "i"
    };
  }

  if (type === "millet") {
    query.title = {
      $regex: "\\b(millet|millet flour|ragi|bajra|jowar|nachni|kambu|sorghum)\\b",
      $options: "i"
    };
  }

  if (type === "tea-coffee-drinks") {
    query.title = {
      $regex: "\\b(tea|coffee|green tea|black tea|chai|espresso|latte|cappuccino|juice|drink|beverage|soft drink|energy drink)\\b",
      $options: "i"
    };
  }

  if (type === "chips-biscuits") {
    query.title = {
      $regex: "\\b(chips|potato chips|nachos|crisps|biscuits|cookies|crackers|snacks)\\b",
      $options: "i"
    };
  }

  if (type === "bath") {
    query.categoryName = { $regex: /personal care|bath/i };

    query.$or = [
      { title: /soap|shampoo|conditioner|lotion|bodywash|facewash/i },
      { name: /soap|shampoo|conditioner|lotion|bodywash|facewash/i }
    ];
  }

  if (type === "organic") {
    query.categoryName = "Grocery";

    query.$or = [
      { title: /organic|natural|bio|eco/i },
      { name: /organic|natural|bio|eco/i }
    ];
  }

  if (type === "supersaver") {
    query.categoryName = "Grocery";

    query.price = { $lte: 100 };

    query.$or = [
      { title: /combo|pack|save|offer|deal|value/i },
      { name: /combo|pack|save|offer|deal|value/i }
    ];
  }

  if (type === "featured") {
  query.categoryName = "Grocery";

  query.$and = [
    { stars: { $gte: 4 } },
    { reviews: { $gte: 50 } }
  ];
}

  // Pagination safety
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

  // Count total
  const total = await Products.countDocuments(query);

  // Debug log for atta-flour query
  console.log('🔍 getProducts query:', { categoryName: finalCategory, type, search, page: pageNum, limit: limitNum });
  console.log('📊 Query object:', query);
  console.log('📈 Total matching products:', total);

  // Sorting
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

  // Log first few products for debugging
  console.log('✅ Fetched products (first 3):', products.slice(0, 3).map(p => ({ title: p.title, price: p.price, categoryName: p.categoryName })));
  console.log(`📦 Total products returned: ${products.length}/${total}`);

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


// ✅ GET SINGLE PRODUCT
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id).lean();

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const formatted = {
    _id: product._id,
    name: product.title || product.name,
    title: product.title || product.name,
    categoryName: product.categoryName,
    image: product.imgUrl || product.image,
    imgUrl: product.imgUrl || product.image,
    price: product.price,
    listPrice: product.listPrice,
    stars: product.stars,
    reviews: product.reviews,
    isBestSeller: product.isBestSeller,
    description: product.description,
    subcategory: product.subcategory
  };

  successResponse(res, 200, formatted, "Product fetched successfully");
});


// ✅ REDIRECT (RICE PRODUCTS)
exports.getRiceProducts = asyncHandler(async (req, res) => {
  res.redirect(`/api/products?categoryName=Grocery&search=rice&limit=50`);
});