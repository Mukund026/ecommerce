const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(async () => {
    const Product = require('./models/Product');
    const cats = await Product.distinct('categoryName');
    console.log('Total categories:', cats.length);
    console.log('Categories:', JSON.stringify(cats, null, 2));
    process.exit(0);
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
