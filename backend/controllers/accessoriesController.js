const Products = require("../models/Product");

const extractPrices = (priceStr) => {
  if (!priceStr) return { price: 0, originalPrice: 0 };

  const matches = priceStr.match(/₹\s?[\d,]+/g);

  if (!matches) return { price: 0, originalPrice: 0 };

  const price = parseInt(matches[0].replace(/[₹,]/g, ""));
  const originalPrice = matches.length > 1 ? parseInt(matches[1].replace(/[₹,]/g, "")) : price;

  return { price, originalPrice };
};

exports.getAccessories = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const query = {
      product_category_tree: {
        $regex: "^Mobiles & Accessories >> Mobile Accessories",
        $options: 'i'
      }
    };

    const totalCount = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limitNum);

    const products = await Products.find(query)
      .select('names price_details stars "rating&reviews" categoryName description brand _id')
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .lean();

    const formatted = products.map(p => {
      const { price, originalPrice } = extractPrices(p.price_details);
      const imageName = ['adapter', 'charger', 'screenguard', 'car charger', 'mobile pouch', 'wall charger'][Math.floor(Math.random() * 6)];
      const image = `/accessoriesimages/${imageName}.jpeg`;
      return {
        _id: p._id,
        product_name: p.names,
        retail_price: originalPrice,
        discounted_price: price,
        image: image,
        description: p.description,
        brand: p.brand || p.categoryName || 'Unknown',
        product_rating: p.stars,
        overall_rating: p["rating&reviews"],
      };
    });

    res.set("Cache-Control", "no-store");
    res.json({
      success: true,
      products: formatted,
      totalPages,
      totalCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

