const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// Book categories
const BOOK_CATEGORIES = [
  "Books - Children",
  "Books - Exam",
  "Books - General",
  "Books - History",
  "Books - Romance",
  "Books - Science"
];

// ===========================
// GET BOOKS
// ===========================
exports.getBooks = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sort = "featured",
    category,
    minPrice,
    maxPrice,
    rating,
    search,
    deals,
    discount,
  } = req.query;

  // Build query
  const query = {
    categoryName: { $in: BOOK_CATEGORIES },
  };

  // --- Category filter ---
  if (category && category.trim()) {
    const cats = category.split(',').map(c => c.trim()).filter(Boolean);
    if (cats.length === 1) {
      query.categoryName = cats[0];
    } else {
      query.categoryName = { $in: cats };
    }
  }

  // --- Price filter ---
  if (minPrice || maxPrice) {
    const priceQ = {};
    if (minPrice) priceQ.$gte = parseFloat(minPrice);
    if (maxPrice) priceQ.$lte = parseFloat(maxPrice);
    query.price = priceQ;
  }

  // --- Rating filter ---
  if (rating) {
    query.stars = { $gte: parseFloat(rating) };
  }

  // --- Text search (title or name) ---
  if (search && search.trim()) {
    const words = search.trim().split(/\s+/).filter(Boolean);
    const orConditions = words.flatMap((word) => [
      { title: { $regex: word, $options: "i" } },
      { name: { $regex: word, $options: "i" } },
    ]);
    query.$and = query.$and ? [...query.$and, { $or: orConditions }] : [{ $or: orConditions }];
  }

  // --- Deals filter (discounted products only) ---
  if (deals === 'true') {
    query.$expr = { $gt: ['$listPrice', '$price'] };
  }

  // --- Discount filter (minimum % off) ---
  if (discount) {
    const threshold = parseFloat(discount);
    if (!isNaN(threshold) && threshold > 0) {
      query.$and = query.$and || [];
      query.$and.push({
        $expr: {
          $and: [
            { $gt: ['$listPrice', 0] },
            { $gt: ['$listPrice', '$price'] },
            {
              $gte: [
                {
                  $multiply: [
                    { $divide: [{ $subtract: ['$listPrice', '$price'] }, '$listPrice'] },
                    100,
                  ],
                },
                threshold,
              ],
            },
          ],
        },
      });
    }
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

  const totalCount = await Products.countDocuments(query);

  // --- Sorting ---
  const sortMap = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    "rating": { stars: -1, reviews: -1 },
    "newest": { createdAt: -1 },
    "featured": { reviews: -1, stars: -1 },
  };

const products = await Products.find(query)
    .select("title name price listPrice imgUrl image stars reviews categoryName description Book-Author author")
    .sort(sortMap[sort] || sortMap["featured"])
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .lean();

// --- Format for frontend ---
  const formattedProducts = products.map((p) => {
    const price = p.price || 0;
    const listPrice = p.listPrice || price;
    const discountPct = listPrice > price ? Math.round(((listPrice - price) / listPrice) * 100) : 0;
    const author = p['Book-Author'] || p.author || p['Book-Author'] || "";
    return {
      _id: p._id,
      id: p._id,
      name: p.title || p.name,
      title: p.title || p.name,
      image: p.imgUrl || p.image || "/api/placeholder-image.jpg",
      imgUrl: p.imgUrl || p.image || "/api/placeholder-image.jpg",
      price,
      originalPrice: listPrice,
      listPrice,
      discount: discountPct,
      rating: p.stars || 0,
      stars: p.stars || 0,
      reviews: p.reviews || 0,
      categoryName: p.categoryName || "Books - General",
      description: p.description || p.title || p.name || "",
      author: author,
    };
  });

  res.json({
    success: true,
    products: formattedProducts,
    totalCount,
    totalPages: Math.ceil(totalCount / limitNum),
    currentPage: pageNum,
  });
});

// ===========================
// GET BOOK BY ID
// ===========================
exports.getBookById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id)
    .select("title name price listPrice imgUrl image stars reviews categoryName description")
    .lean();

  if (!product) {
    res.status(404);
    throw new Error("Book not found");
  }

  const price = product.price || 0;
  const listPrice = product.listPrice || price;
  const discountPct = listPrice > price ? Math.round(((listPrice - price) / listPrice) * 100) : 0;

  res.json({
    success: true,
    product: {
      _id: product._id,
      id: product._id,
      name: product.title || product.name,
      title: product.title || product.name,
      image: product.imgUrl || product.image || "/api/placeholder-image.jpg",
      imgUrl: product.imgUrl || product.image || "/api/placeholder-image.jpg",
      price,
      originalPrice: listPrice,
      listPrice,
      discount: discountPct,
      rating: product.stars || 0,
      stars: product.stars || 0,
      reviews: product.reviews || 0,
      categoryName: product.categoryName || "Books - General",
      description: product.description || product.title || product.name || "",
    },
  });
});

// ===========================
// GET BOOK CATEGORIES
// ===========================
exports.getBookCategories = asyncHandler(async (req, res) => {
  const categories = BOOK_CATEGORIES.map((cat) => ({
    name: cat,
    label: cat.replace("Books - ", ""),
  }));

  res.json({
    success: true,
    categories,
  });
});
