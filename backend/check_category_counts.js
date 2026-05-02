const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(async () => {
    const Product = require('./models/Product');
    
    const categories = [
      "Women",
      "Women's Accessories",
      "Women's Clothing",
      "Women's Handbags",
      "Women's Health  Family Planning",
      "Women's Jewelry",
      "Women's Shoes",
      "Women's Watches",
      "Men",
      "Men's Accessories",
      "Men's Clothing",
      "Men's Jewelry",
      "Men's Shoes",
      "Men's Watches",
      "Sporting Apparel",
      "Sport Specific Clothing",
      "Shaving  Hair Removal Products",
      "Shelf Brackets  Supports",
      "Shoe, Jewelry  Watch Accessories",
      "Perfume  Cologne"
    ];
    
    for (const cat of categories) {
      const count = await Product.countDocuments({ categoryName: cat });
      console.log(`${cat}: ${count}`);
    }
    
    process.exit(0);
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
