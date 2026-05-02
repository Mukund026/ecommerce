const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// ===========================
// TOYS CATEGORIES (Exact list from user's MongoDB query)
// NOTE: DB uses double spaces instead of & (e.g. "Toys  Games"), so we normalize queries.
// ===========================
const TOY_CATEGORIES = [
  "Sandboxes  Beach Toys",
  "Toy Foam Blasters  Guns",
  "Toy Gardening Equipment",
  "Toy Sports Equipment",
  "Toy Vehicles",
  "Toys  Games",
  "Play Sets  Playground Equipment",
  "Pogo Sticks  Hopping Toys",
  "Outdoor Play Toys",
  "Kids' Ball Pits  Accessories",
  "Kids' Play Tents  Tunnels",
  "Kids' Slumber Bags",
  "Handmade Toys  Games",
  "Baby  Toddler Toys",
  "Building  Construction Toys",
  "Collectible Toys",
  "Stuffed  Plush Animals",
  "Swimming Pool  Outdoor Water Toys",
];

// Normalize frontend `&` → DB double-space for matching
const normalizeCat = (str) => str.replace(/\s*&\s*/g, '  ').trim();

// ===========================
// GET TOYS PRODUCTS
// ===========================
exports.getToys = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sort = "featured",
    minPrice,
    maxPrice,
    rating,
    search,
    category,
    deals,
    brands,
    discount,
    ageRange,
    outOfStock,
  } = req.query;

  // Build query using $and so multiple $or/$expr conditions don't clash
  const query = {
    $and: [
      { categoryName: { $in: TOY_CATEGORIES } },
    ],
  };

  // --- Category filter (single or comma-separated) ---
  if (category && category.trim()) {
    const cats = category.split(',').map(c => normalizeCat(c.trim())).filter(Boolean);
    if (cats.length === 1) {
      query.$and.push({ categoryName: cats[0] });
    } else {
      query.$and.push({ categoryName: { $in: cats } });
    }
  }

  // --- Price filter ---
  if (minPrice || maxPrice) {
    const priceQ = {};
    if (minPrice) priceQ.$gte = parseFloat(minPrice);
    if (maxPrice) priceQ.$lte = parseFloat(maxPrice);
    query.$and.push({ price: priceQ });
  }

  // --- Rating filter ---
  if (rating) {
    query.$and.push({ stars: { $gte: parseFloat(rating) } });
  }

  // --- Text search (title or name) ---
  if (search && search.trim()) {
    const words = search.trim().split(/\s+/).filter(Boolean);
    const orConditions = words.flatMap((word) => [
      { title: { $regex: word, $options: "i" } },
      { name: { $regex: word, $options: "i" } },
    ]);
    query.$and.push({ $or: orConditions });
  }

  // --- Deals filter (discounted products only) ---
  if (deals === 'true') {
    query.$and.push({ $expr: { $gt: ['$listPrice', '$price'] } });
  }

  // --- Brands filter (regex on title/name) ---
  if (brands && brands.trim()) {
    const brandList = brands.split(',').map(b => b.trim()).filter(Boolean);
    if (brandList.length) {
      const brandRegex = brandList.map(b => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      query.$and.push({
        $or: [
          { title: { $regex: brandRegex, $options: "i" } },
          { name: { $regex: brandRegex, $options: "i" } },
        ],
      });
    }
  }

  // --- Discount filter (minimum % off) ---
  if (discount) {
    const threshold = parseFloat(discount);
    if (!isNaN(threshold) && threshold > 0) {
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

  // --- Age Range filter (regex keywords on title/name) ---
  if (ageRange && ageRange.trim()) {
    const words = ageRange.trim().split(/\s+/).filter(Boolean);
    const orConditions = words.flatMap((word) => [
      { title: { $regex: word, $options: "i" } },
      { name: { $regex: word, $options: "i" } },
    ]);
    query.$and.push({ $or: orConditions });
  }

  // --- Out of Stock filter ---
  // NOTE: DB currently has no stock field; accept param for future compatibility
  if (outOfStock !== 'true') {
    // If user does NOT want out-of-stock, we can't filter since field doesn't exist.
    // When stock field is added, uncomment: query.$and.push({ stock: { $gt: 0 } });
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

  // Debug: log the actual MongoDB query
  console.log("QUERY:", JSON.stringify(query, null, 2));

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
    .select("title name price listPrice imgUrl image stars reviews categoryName description")
    .sort(sortMap[sort] || sortMap["featured"])
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .lean();

  // --- Format for frontend ProductCard / ToysProductCard ---
  const formattedProducts = products.map((p) => {
    const price = p.price || 0;
    const listPrice = p.listPrice || price;
    const discountPct = listPrice > price ? Math.round(((listPrice - price) / listPrice) * 100) : 0;
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
      categoryName: p.categoryName || "Toys & Games",
      description: p.description || p.title || p.name || "",
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
// GET TOP TOY BRANDS
// ===========================
exports.getTopToyBrands = asyncHandler(async (req, res) => {
  const brandPatterns = {
    Lego: "lego|LEGO",
    Barbie: "barbie|BARBIE",
    "Hot Wheels": "hot\\s*wheels|hotwheels|HOT\\s*WHEELS|HOTWHEELS",
    Funskool: "funskool|FUNSKOOL",
    Nerf: "nerf|NERF",
    "Fisher-Price": "fisher[-\\s]?price|FISHER[-\\s]?PRICE",
    Hasbro: "hasbro|HASBRO",
    Mattel: "mattel|MATTEL",
    Disney: "disney|DISNEY",
    "Play-Doh": "play[-\\s]?doh|PLAY[-\\s]?DOH",
  };

  const brandRegexes = Object.values(brandPatterns)
    .map((p) => `(${p})`)
    .join("|");

  const products = await Products.find({
    categoryName: { $in: TOY_CATEGORIES },
    $or: [
      { title: { $regex: brandRegexes, $options: "i" } },
      { name: { $regex: brandRegexes, $options: "i" } },
    ],
  })
    .select("title name imgUrl image stars reviews")
    .sort({ stars: -1, reviews: -1 })
    .limit(200)
    .lean();

  const grouped = {};

  products.forEach((p) => {
    let brandKey = "";
    for (let [name, regex] of Object.entries(brandPatterns)) {
      if ((p.title || p.name || "").match(new RegExp(regex, "i"))) {
        brandKey = name;
        break;
      }
    }
    if (!brandKey) return;
    if (!grouped[brandKey]) grouped[brandKey] = { products: [], topProduct: null };
    grouped[brandKey].products.push(p);
    if (
      !grouped[brandKey].topProduct ||
      (p.stars || 0) > (grouped[brandKey].topProduct.stars || 0)
    ) {
      grouped[brandKey].topProduct = p;
    }
  });

  const brands = Object.entries(grouped).map(([name, data], index) => ({
    id: index + 1,
    name,
    image:
      data.topProduct?.imgUrl ||
      data.topProduct?.image ||
      "/api/placeholder-image.jpg",
    productCount: data.products.length,
    link: `/toys?search=${encodeURIComponent(name)}`,
  }));

  res.json({ success: true, brands });
});

// ===========================
// GET SINGLE TOY PRODUCT
// ===========================
exports.getToyById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id)
    .select("title name price listPrice imgUrl image stars reviews categoryName description")
    .lean();

  if (!product) {
    res.status(404);
    throw new Error("Toy product not found");
  }

  res.json({
    success: true,
    product: {
      _id: product._id,
      id: product._id,
      name: product.title || product.name,
      image: product.imgUrl || product.image || "/api/placeholder-image.jpg",
      imgUrl: product.imgUrl || product.image || "/api/placeholder-image.jpg",
      price: product.price || 0,
      originalPrice: product.listPrice || product.price || 0,
      listPrice: product.listPrice || product.price || 0,
      rating: product.stars || 0,
      stars: product.stars || 0,
      reviews: product.reviews || 0,
      categoryName: product.categoryName || "Toys & Games",
      description: product.description || product.title || product.name || "",
    },
  });
});
