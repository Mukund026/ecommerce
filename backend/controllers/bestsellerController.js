const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// GET BESTSELLERS
exports.getBestsellers = asyncHandler(async (req, res) => {
  const Products = require("../models/Product"); // Move inside if scope issue, but no
const { category, excludeId, page = 1, limit = 10 } = req.query;

  let query = {};
  const excludeCondition = excludeId ? { _id: { $ne: excludeId } } : {};

  console.log("BESTSELLER CATEGORY RECEIVED:", category, "EXCLUDE:", excludeId);

  if (category && category.toLowerCase().includes('smartphone')) {
    // Smartphone special handling - use name regex like in smartphoneController
    const brandsRegex = /(iphone|samsung|redmi|realme|vivo|oppo|oneplus|poco|iqoo|infinix|motorola|pixel)/i;
    query = {
      $and: [
        { names: brandsRegex },
        { names: { $regex: /GB/i } },
        excludeCondition
      ]
    };
    console.log("Using smartphone regex query");
  } else if (category) {
    const categories = category.split(",").map(c => c.trim());
    query.categoryName = { $in: categories };
    query = { ...query, ...excludeCondition };
  } else {
    query = excludeCondition;
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  // Sort logic → bestseller = high reviews + high rating
const products = await Products.find(query)
    .select('title name price imgUrl image stars reviews categoryName subcategory _id listPrice')
    .sort({ reviews: -1, stars: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .lean();

  // Fix price <=0 products
  const categoryAvg = {};
  const categoryDefaults = {
    "Women's Jewelry": 999,
    "Women's Handbags": 1299,
    "Skin Care Products": 599,
    "Electronics": 2999,
    "Garden Structures Germination Equipment": 799,
    "Sport Specific Clothing": 899
  };

  // First pass: calculate avgs per category
  products.forEach(p => {
    if (p.categoryName && p.price > 0) {
      if (!categoryAvg[p.categoryName]) categoryAvg[p.categoryName] = [];
      categoryAvg[p.categoryName].push(p.price);
    }
  });
  Object.keys(categoryAvg).forEach(cat => {
    const sum = categoryAvg[cat].reduce((a, b) => a + b, 0);
    categoryAvg[cat] = sum / categoryAvg[cat].length;
  });

  // Second pass: fix zero prices
  const fixedProducts = [];
  for (let product of products) {
    if (product.price <= 0 && product.categoryName) {
      const avg = categoryAvg[product.categoryName] || categoryDefaults[product.categoryName] || 500;
      const newPrice = Math.round(avg * (0.8 + Math.random() * 0.4)); // 80-120% of avg
      const newListPrice = Math.round(newPrice * 1.3);

      // Persist to DB
      await Products.updateOne(
        { _id: product._id },
        { $set: { price: newPrice, listPrice: newListPrice } }
      );

      product.price = newPrice;
      product.listPrice = newListPrice;
      console.log(`Fixed price for ${product.title || product.name}: ${newPrice}`);
    }
    fixedProducts.push(product);
  }

  console.log("QUERY:", JSON.stringify(query));
  console.log("FOUND PRODUCTS:", products.length);

  const total = await Products.countDocuments(query).maxTimeMS(10000);

  res.json({
    success: true,
    products: fixedProducts,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
  });
});
