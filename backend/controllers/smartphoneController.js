const Products = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// PRICE EXTRACTOR
function extractPrices(priceStr) {
  if (!priceStr) return { price: 0, originalPrice: 0 };

  const matches = priceStr.match(/₹\s?[\d,]+/g);
  if (!matches) return { price: 0, originalPrice: 0 };

  const price = parseInt(matches[0].replace(/[₹,]/g, ""));
  const originalPrice =
    matches.length > 1
      ? parseInt(matches[1].replace(/[₹,]/g, ""))
      : price;

  return { price, originalPrice };
}

//
// ✅ GET SMARTPHONES (UNCHANGED LOGIC)
//
exports.getSmartphones = asyncHandler(async (req, res) => {
const { page = 1, limit = 20, maxPrice, includeBrands = 'false' } = req.query;

  const brandsRegex =
    /(iphone|samsung|redmi|realme|vivo|oppo|oneplus|poco|iqoo|infinix|motorola|pixel)/i;

  const baseQuery = {
    $and: [{ names: brandsRegex }, { names: { $regex: /GB/i } }],
  };

  let priceQuery = {};

  if (maxPrice) {
    const maxPriceNum = parseInt(maxPrice);
    priceQuery = {
      price_details: {
        $regex: new RegExp(
          `₹\\s?([0-9,]{0,}${maxPriceNum})`,
          "i"
        ),
      },
    };
  }

  let query = baseQuery;

  if (req.query.category === "accessories") {
    query.product_category_tree =
      /Mobiles & Accessories >> Mobile Accessories/i;
  } else if (Object.keys(priceQuery).length) {
    query = { $and: [baseQuery, priceQuery] };
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  let totalCount = await Products.countDocuments(query);

  let products = await Products.find(query)
    .select(
      'names images_links price_details stars "rating&reviews" categoryName description _id'
    )
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum)
    .lean();

  const formattedProducts = products.map((p) => {
    const { price, originalPrice } = extractPrices(p.price_details);

    return {
      _id: p._id,
      id: p._id,
      name: p.names,
      image: Array.isArray(p.images_links)
        ? p.images_links[0]
        : p.images_links,
      imgUrl: Array.isArray(p.images_links)
        ? p.images_links[0]
        : p.images_links,
      price,
      originalPrice,
      listPrice: originalPrice,
      stars: p.stars,
      reviews: p["rating&reviews"],
      categoryName: p.categoryName || "Smartphones",
      description: p.description || "Premium smartphone",
    };
  });

  const responseData = {
    success: true,
    products: formattedProducts,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  };

  if (includeBrands === 'true') {
    const brandProducts = await Products.find({
      names: { $regex: "(SAMSUNG|IPHONE|REALME)", $options: "i" },
      price_details: { $ne: "" },
    })
      .select("names images_links price_details stars _id")
      .limit(100)
      .lean();

    const targetBrands = {
      Samsung: "SAMSUNG|samsung",
      Apple: "IPHONE|iphone|APPLE|apple",
      realme: "realme|REALME",
    };

    const grouped = {};

    brandProducts.forEach((p) => {
      let brandKey = "";

      for (let [name, regex] of Object.entries(targetBrands)) {
        if (p.names.match(new RegExp(regex, "i"))) {
          brandKey = name;
          break;
        }
      }

      if (!brandKey) return;

      if (!grouped[brandKey]) grouped[brandKey] = [];

      if (grouped[brandKey].length < 4) {
        const { price, originalPrice } = extractPrices(p.price_details);

        grouped[brandKey].push({
          id: p._id,
          name: p.names,
          price,
          originalPrice,
          discount: originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
          image: Array.isArray(p.images_links) ? p.images_links[0] : p.images_links,
          rating: p.stars || 4.3,
        });
      }
    });

    const priorityBrands = ["Samsung", "Apple", "realme"];

    const brands = priorityBrands.map((name, index) => ({
      id: index + 1,
      name,
      products: grouped[name] || [],
    }));

    responseData.brands = brands;
  }

  res.json(responseData);
});

//
// ✅ GET BRANDS (FIXED)
//
exports.getBrands = asyncHandler(async (req, res) => {
  const targetBrands = {
    Samsung: "SAMSUNG",
    Apple: "IPHONE|APPLE",
    iQOO: "IQOO",
    OnePlus: "ONEPLUS",
    realme: "REALME",
  };

  const products = await Products.find({
    names: {
      $regex: "(SAMSUNG|IPHONE|IQOO|ONEPLUS|REALME)",
      $options: "i",
    },
    price_details: { $ne: "" },
  })
    .select(
      "names images_links price_details stars rating&reviews _id"
    )
    .limit(100)
    .lean();

  const grouped = {};

  products.forEach((p) => {
    let brandKey = "";

    for (let [name, regex] of Object.entries(targetBrands)) {
      if (p.names.match(new RegExp(regex, "i"))) {
        brandKey = name;
        break;
      }
    }

    if (!brandKey) return;

    if (!grouped[brandKey]) grouped[brandKey] = [];

    if (grouped[brandKey].length < 4) {
      const { price, originalPrice } = extractPrices(
        p.price_details
      );

      grouped[brandKey].push({
        id: p._id,
        name: p.names,
        price,
        originalPrice,
        discount:
          originalPrice > 0
            ? Math.round(
                ((originalPrice - price) / originalPrice) * 100
              )
            : 0,
        image: Array.isArray(p.images_links)
          ? p.images_links[0]
          : p.images_links,
        rating: p.stars || 4.3,
      });
    }
  });

  const brands = Object.entries(grouped).map(
    ([name, products], index) => ({
      id: index + 1,
      name,
      products,
    })
  );

  res.json({ success: true, brands });
});

//
// ✅ GET SINGLE PRODUCT (FIXED)
//
exports.getSmartphoneById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id)
    .select(
      'names images_links price_details stars "rating&reviews" categoryName description _id'
    )
    .lean();

  if (!product) {
    res.status(404);
    throw new Error("Smartphone not found");
  }

  const { price, originalPrice } = extractPrices(
    product.price_details
  );

  res.json({
    success: true,
    product: {
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
      categoryName: product.categoryName,
      description: product.description,
    },
  });
});
