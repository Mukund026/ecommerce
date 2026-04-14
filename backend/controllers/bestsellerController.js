const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// GET BESTSELLERS
exports.getBestsellers = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  const query = {};

  console.log("BESTSELLER CATEGORY RECEIVED:", category);
  if (category) {
    query.categoryName = category;
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  // Sort logic → bestseller = high reviews + high rating
  const products = await Products.find(query)
    .select('title name price imgUrl image stars reviews categoryName subcategory _id listPrice')
    .sort({ reviews: -1, stars: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .maxTimeMS(30000)
    .lean();

  const total = await Products.countDocuments(query).maxTimeMS(10000);

  res.json({
    success: true,
    products,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
  });
});
