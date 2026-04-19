const Products = require("../models/Product");

exports.getAccessories = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const query = {
      category: "Mobile Accessories"
    };

    const totalCount = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limitNum);

    const products = await Products.find(query)
      .select('name price listPrice stars reviews categoryName description _id')
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .lean();

    const formatted = products.map(p => {
      const retail_price = p.listPrice || Math.round(p.price * 1.5);
      const discounted_price = p.price;
      const availableImages = ['adapter', 'charger', 'screenguard', 'car charger', 'mobile pouch', 'wall charger'];
      const keywords = {
        'adapter': 'adapter',
        'charger': 'charger',
        'guard': 'screenguard',
        'car': 'car charger',
        'pouch': 'mobile pouch',
        'wall': 'wall charger'
      };
      const productLower = p.name.toLowerCase();
      let imageName = 'charger'; // fallback
      for (const [key, img] of Object.entries(keywords)) {
        if (productLower.includes(key)) {
          imageName = img;
          break;
        }
      }
      const image = `/accessoriesimages/${imageName}.jpeg`;
      return {
        _id: p._id,
        product_name: p.name,
        retail_price,
        discounted_price,
        image,
        description: p.description || '',
        brand: p.categoryName || 'Generic',
        product_rating: p.stars || 4.0,
        overall_rating: p.reviews || 0,
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

