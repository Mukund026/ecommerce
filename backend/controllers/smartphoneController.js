const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

function extractPrices(priceStr) {
  if (!priceStr) return { price: 0, originalPrice: 0 };

  const matches = priceStr.match(/₹\s?[\d,]+/g);

  if (!matches) return { price: 0, originalPrice: 0 };

  const price = parseInt(matches[0].replace(/[₹,]/g, ""));
  const originalPrice = matches.length > 1 ? parseInt(matches[1].replace(/[₹,]/g, "")) : price;

  return { price, originalPrice };
}

// GET SMARTPHONES
exports.getSmartphones = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, maxPrice } = req.query;

  const brandsRegex = /(iphone|samsung|redmi|realme|vivo|oppo|oneplus|poco|iqoo|infinix|motorola|pixel)/i;

  const baseQuery = {
    $and: [
      { names: brandsRegex },
      { names: { $regex: /GB/i } }
    ]
  };

  let priceQuery = {};
  if (maxPrice) {
    const maxPriceNum = parseInt(maxPrice);
    priceQuery = {
      price_details: {
        $regex: new RegExp(`₹\\s?([0-9,]{0,}${maxPriceNum.toLocaleString('en-IN').replace(/,/g, '')}|([0-9,]{1,}${Math.floor(maxPriceNum/10).toLocaleString('en-IN').replace(/,/g, '')})|([0-9,]{1,}${Math.floor(maxPriceNum/100).toLocaleString('en-IN').replace(/,/g, '')}))`, 'i')
      }
    };
  }

  let query = baseQuery;
  if (req.query.category === 'accessories') {
    query.product_category_tree = /Mobiles & Accessories >> Mobile Accessories/i;
  } else if (Object.keys(priceQuery).length) {
    query = { $and: [baseQuery, priceQuery] };
  }

  let totalCount;
  let products;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const isLimitedAccessories = req.query.category === 'accessories' && req.query.limited === 'true';
  
  if (isLimitedAccessories) {
    const allAccessories = await Products.find(query)
      .select('names images_links price_details stars "rating&reviews" categoryName description _id')
      .lean();
    
    const filteredRaw = allAccessories.filter(p => {
      const { price, originalPrice } = extractPrices(p.price_details);
      return originalPrice > price * 1.25;
    });
    
    totalCount = filteredRaw.length;
    products = filteredRaw.slice((pageNum - 1) * limitNum, pageNum * limitNum);
  } else {
    totalCount = await Products.countDocuments(query);
    products = await Products.find(query)
      .select('names images_links price_details stars "rating&reviews" categoryName description _id')
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .lean();
  }

  const formattedProducts = products.map(p => {
    const { price, originalPrice } = extractPrices(p.price_details);
    return {
      _id: p._id,
      id: p._id,
      name: p.names,
      image: Array.isArray(p.images_links) ? p.images_links[0] : p.images_links,
      imgUrl: Array.isArray(p.images_links) ? p.images_links[0] : p.images_links,
      price,
      listPrice: originalPrice,
      originalPrice,
      stars: p.stars,
      reviews: p["rating&reviews"],
      categoryName: p.categoryName || "Smartphones",
      description: p.description || "Premium smartphone with latest features and performance."
    };
  });

  const totalPages = Math.ceil(totalCount / parseInt(limit));
  res.json({
    success: true,
    products: formattedProducts,
    totalPages,
    totalCount
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

  const { price, originalPrice } = extractPrices(product.price_details);
  const formattedProduct = {
    _id: product._id,
    id: product._id,
    name: product.names,
    image: Array.isArray(product.images_links)
      ? product.images_links[0]
      : product.images_links,
    imgUrl: Array.isArray(product.images_links)
      ? product.images_links[0]
      : product.images_links,
    price,
    originalPrice,
    listPrice: originalPrice,
    stars: product.stars,
    reviews: product["rating&reviews"],
    categoryName: product.categoryName || "Smartphones",
    description: product.description || "Premium smartphone with latest features and performance."
  };

  res.json({
    success: true,
    product: formattedProduct
  });
});
