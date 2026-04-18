const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

function extractPrice(priceStr) {
  if (!priceStr) return 0;

  // ✅ Correct regex (NO double slash)
  const match = priceStr.match(/₹\s?([\d,]+)/);

  if (!match) return 0;

  return parseInt(match[1].replace(/,/g, ''));
}

// GET SMARTPHONES
exports.getSmartphones = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const brandsRegex = /(iphone|samsung|redmi|realme|vivo|oppo|oneplus|poco|iqoo|infinix|motorola|pixel)/i;

  const query = {
    $and: [
      { names: brandsRegex },
      { names: { $regex: /GB/i } }
    ]
  };

  const products = await Products.find(query)
    .select('names images_links price_details stars "rating&reviews" categoryName description _id')
    .limit(parseInt(limit))
    .skip((page - 1) * limit)
    .lean();

  const formattedProducts = products.map(p => ({
    _id: p._id,
    name: p.names,
    image: Array.isArray(p.images_links) ? p.images_links[0] : p.images_links,
    price: extractPrice(p.price_details),
    stars: p.stars,
    reviews: p["rating&reviews"],
    categoryName: p.categoryName || "Smartphones"
  }));

  res.json({
    success: true,
    products: formattedProducts
  });
});

// GET SINGLE SMARTPHONE by ID
exports.getSmartphoneById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id)
    .select('names images_links price_details stars "rating&reviews" categoryName description _id')
    .lean();

  if (!product) {
    res.status(404);
    throw new Error('Smartphone not found');
  }

  const formattedProduct = {
    _id: product._id,
    name: product.names,
    image: Array.isArray(product.images_links)
      ? product.images_links[0]
      : product.images_links,
    price: extractPrice(product.price_details),
    stars: product.stars,
    reviews: product["rating&reviews"],
    categoryName: product.categoryName || "Smartphones",
    description: product.description || "No description available"
  };

  res.json({
    success: true,
    product: formattedProduct
  });
});