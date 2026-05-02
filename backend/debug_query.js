require('dotenv').config({path: './backend/.env'});
const mongoose = require('mongoose');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const Product = require('./backend/models/Product');
  
  const cats = await Product.distinct('categoryName');
  console.log('categoryName values count:', cats.length);
  console.log('Sample categories:', cats.slice(0, 30));
  
  const count1 = await Product.countDocuments({categoryName: {$exists: true, $regex: /^computer/i}});
  const count2 = await Product.countDocuments({product_category_tree: {$exists: true, $regex: /computer/i}});
  const count3 = await Product.countDocuments({title: {$exists: true, $regex: /\b(mouse|keyboard|headset|webcam|monitor|laptop|gaming pc|desktop|logitech|razer|corsair|hyperx|steelseries|redragon|dell|hp|lenovo|acer|asus|macbook|imac)\b/i}});
  
  console.log('Condition 1 (categoryName starts with computer):', count1);
  console.log('Condition 2 (product_category_tree has computer):', count2);
  console.log('Condition 3 (title keywords):', count3);
  
  const total = await Product.countDocuments();
  console.log('Total products:', total);
  
  // Check if title regex is the culprit - test individual keywords
  const hpCount = await Product.countDocuments({title: {$regex: /\bhp\b/i}});
  console.log('HP in title:', hpCount);
  
  mongoose.disconnect();
};

run().catch(e => { console.error(e); process.exit(1); });

