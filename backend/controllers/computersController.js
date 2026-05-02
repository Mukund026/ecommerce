const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// Helper: Fix products with zero or missing prices by calculating category averages
async function fixZeroPrices(products) {
  const categoryDefaults = {
    "Computer Accessories": 599,
    "Computer Audio Video Accessories": 799,
    "Computer Cable Adapters": 399,
    "Computer Components": 2499,
    "Computer Hard Drive Accessories": 999,
    "Computer Monitor Accessories": 1299,
    "Computer Monitors": 8999,
    "Computer Security Cables": 499,
    "Computer Uninterrupted Power Supply": 2499,
    "Computers": 9999,
    "PC Accessories": 699,
    "Electronics": 2999,
    "Laptops": 45999,
    "Desktop Computers": 34999
  };

  // First pass: calculate averages per category (only for valid prices)
  const categoryAvg = {};
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

  // Second pass: fix zero or missing prices
  const fixedProducts = [];
  for (let product of products) {
    if ((!product.price || product.price === 0) && product.categoryName) {
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
      console.log(`Fixed price for ${product.title || product.name}: ₹${newPrice}`);
    }
    fixedProducts.push(product);
  }

  return fixedProducts;
}

exports.getComputers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, includeBrands = 'false' } = req.query;

let query = {};

// Dynamic filter support
if (req.query.category) {
  const categories = Array.isArray(req.query.category) ? req.query.category : req.query.category.split(',');
  query.categoryName = { $in: categories.map(cat => cat.trim()) };
} else {
  query.categoryName = { $regex: /computer accessories|pc accessories|mouse|keyboard|headset|webcam|monitor|laptop (pad|stand)|gaming (mouse|keyboard|headset)|logitech|razer|corsair/i };
}

if (req.query.brands) {
  const brands = Array.isArray(req.query.brands) ? req.query.brands : req.query.brands.split(',');
  query.$or = brands.map(brand => ({
    title: { $regex: new RegExp(brand.trim(), 'i') }
  }));
}
if (req.query.minPrice || req.query.maxPrice) {
  query.price = {};
  if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
  if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
}
if (req.query.rating) {
  query.stars = { $gte: parseFloat(req.query.rating) };
}
if (req.query.deals === 'true') {
  query.$expr = { $lt: ['$price', '$listPrice'] };
}
// outOfStock ignored - no stock field

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  // Dynamic sort
  const sortOptions = { _id: -1 };
  if (req.query.rating) {
    sortOptions.stars = -1;
    sortOptions.reviews = -1;
  }

  const totalCount = await Products.countDocuments(query);

  let products = await Products.find(query)
    .sort(sortOptions)
.select([
  'title',
  'imgUrl',
  'price',
  'listPrice',
  'stars',
  'reviews',
  'categoryName'
])
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum)
    .lean();

  // Fix zero or missing prices before formatting
  products = await fixZeroPrices(products);

const formattedProducts = products.map((p) => {
  return {
    _id: p._id,
    id: p._id,

    // ✅ CORRECT FIELDS
    name: p.title,
    image: p.imgUrl || "https://via.placeholder.com/200",
    imgUrl: p.imgUrl || "https://via.placeholder.com/200",

    price: p.price || 0,
    originalPrice: p.listPrice || p.price || 0,
    listPrice: p.listPrice || p.price || 0,

    stars: p.stars || 4.0,
    reviews: p.reviews || Math.floor(Math.random() * 5000) + 100,

    categoryName: p.categoryName || "Computers",
    description: p.title || "Computer product",
  };
});

  const responseData = {
    success: true,
    products: formattedProducts,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
    currentPage: pageNum
  };

  if (includeBrands === 'true') {
const computerBrandsRegex = /(logitech|razer|corsair|hyperx|steelseries|redragon|mouse|keyboard|headset)/i;
    const brandProducts = await Products.find({categoryName: { $regex: /computer/i },title: computerBrandsRegex})
      .select(['title', 'imgUrl', 'price', 'listPrice', 'stars', '_id'])
      .limit(100)
      .lean();

const targetBrands = {
  Logitech: "LOGITECH|logitech",
  Razer: "RAZER|razer",
  Corsair: "CORSAIR|corsair",
  HyperX: "HYPERX|hyperx",
  SteelSeries: "STEELSERIES|steelseries",
  Redragon: "REDDRAGON|redragon",
};

    const grouped = {};

    brandProducts.forEach((p) => {
      let brandKey = "";
      for (let [name, regex] of Object.entries(targetBrands)) {
        if (p.title.match(new RegExp(regex, "i"))) {
          brandKey = name;
          break;
        }
      }
      if (!brandKey) return;

      if (!grouped[brandKey]) grouped[brandKey] = [];
      if (grouped[brandKey].length < 4) {
        grouped[brandKey].push({
          id: p._id,
          name: p.title,
          price: p.price || 0,
          originalPrice: p.listPrice || p.price || 0,
          discount: p.listPrice > p.price ? Math.round(((p.listPrice - p.price) / p.listPrice) * 100) : 0,
          image: p.imgUrl || "https://via.placeholder.com/200",
          rating: p.stars || 4.3,
        });
      }
    });

    const priorityBrands = ["Dell", "HP", "Lenovo", "Acer", "Apple", "ASUS"];
    const brands = priorityBrands.map((name) => ({
      id: priorityBrands.indexOf(name) + 1,
      name,
      products: grouped[name] || [],
    }));

    responseData.brands = brands;
  }

  res.json(responseData);
});

exports.getBrands = asyncHandler(async (req, res) => {
  const baseQuery = {
    categoryName: { $regex: /computer/i }
  };

  const targetBrands = {
    Dell: "DELL|dell",
    HP: "HP|hewlett",
    Lenovo: "LENOVO|lenovo",
    Acer: "ACER|acer",
    Apple: "APPLE|macbook|imac",
    ASUS: "ASUS|asus",
  };

  let products = await Products.find({
    ...baseQuery,
    title: { $regex: Object.values(targetBrands).join("|"), $options: "i" }
  })
    .select(['title', 'imgUrl', 'price', 'listPrice', 'stars', '_id'])
    .limit(100)
    .lean();

  // Fix zero or missing prices before grouping
  products = await fixZeroPrices(products);

  const grouped = {};

  products.forEach((p) => {
    let brandKey = "";
    for (let [name, regex] of Object.entries(targetBrands)) {
      if (p.title.match(new RegExp(regex, "i"))) {
        brandKey = name;
        break;
      }
    }
    if (!brandKey) return;

    if (!grouped[brandKey]) grouped[brandKey] = [];
    if (grouped[brandKey].length < 4) {
      grouped[brandKey].push({
        id: p._id,
        name: p.title,
        price: p.price || 0,
        originalPrice: p.listPrice || p.price || 0,
        discount: p.listPrice > p.price ? Math.round(((p.listPrice - p.price) / p.listPrice) * 100) : 0,
        image: p.imgUrl || "https://via.placeholder.com/200",
        rating: p.stars || 4.3,
      });
    }
  });

  const brands = Object.entries(grouped).map(([name, products], index) => ({
    id: index + 1,
    name,
    products,
  }));

  res.json({ success: true, brands });
});

exports.getComputerById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id)
    .select([
      'title',
      'imgUrl',
      'price',
      'listPrice',
      'stars',
      'reviews',
      'categoryName'
    ])
    .lean();

  if (!product) {
    res.status(404);
    throw new Error("Computer product not found");
  }

  // Fix zero or missing price for single product
  const [fixedProduct] = await fixZeroPrices([product]);

  res.json({
    success: true,
    product: {
      _id: fixedProduct._id,
      id: fixedProduct._id,
      name: fixedProduct.title,
      image: fixedProduct.imgUrl || "https://via.placeholder.com/200",
      imgUrl: fixedProduct.imgUrl || "https://via.placeholder.com/200",
      price: fixedProduct.price || 0,
      originalPrice: fixedProduct.listPrice || fixedProduct.price || 0,
      listPrice: fixedProduct.listPrice || fixedProduct.price || 0,
      stars: fixedProduct.stars || 4.0,
      reviews: fixedProduct.reviews || Math.floor(Math.random() * 5000) + 100,
      categoryName: fixedProduct.categoryName || "Computers",
      description: fixedProduct.title || "Computer product",
    },
  });
});
