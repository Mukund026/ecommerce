const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");




exports.getComputers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, includeBrands = 'false' } = req.query;

const baseQuery = {
  categoryName: { $regex: /computer/i }
};

const query = baseQuery;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const totalCount = await Products.countDocuments(query);

  const products = await Products.find(query)
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

    stars: p.stars || 0,
    reviews: p.reviews || 0,

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
    const computerBrandsRegex = /(dell|hp|lenovo|acer|apple|asus|msi|lg|samsung|corsair|logitech)/i;
    const brandProducts = await Products.find({
      ...baseQuery,
      title: computerBrandsRegex
    })
      .select(['title', 'imgUrl', 'price', 'listPrice', 'stars', '_id'])
      .limit(100)
      .lean();

    const targetBrands = {
      Dell: "DELL|dell",
      HP: "HP|hewlett",
      Lenovo: "LENOVO|lenovo",
      Acer: "ACER|acer",
      Apple: "APPLE|macbook|imac",
      ASUS: "ASUS|asus",
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

  const products = await Products.find({
    ...baseQuery,
    title: { $regex: Object.values(targetBrands).join("|"), $options: "i" }
  })
    .select(['title', 'imgUrl', 'price', 'listPrice', 'stars', '_id'])
    .limit(100)
    .lean();

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

  res.json({
    success: true,
    product: {
      _id: product._id,
      id: product._id,
      name: product.title,
      image: product.imgUrl || "https://via.placeholder.com/200",
      imgUrl: product.imgUrl || "https://via.placeholder.com/200",
      price: product.price || 0,
      originalPrice: product.listPrice || product.price || 0,
      listPrice: product.listPrice || product.price || 0,
      stars: product.stars || 0,
      reviews: product.reviews || 0,
      categoryName: product.categoryName || "Computers",
      description: product.title || "Computer product",
    },
  });
});
