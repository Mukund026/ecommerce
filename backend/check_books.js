const mongoose = require('mongoose');
require('./config/db');

const Product = require('./models/Product');

async function check() {
  try {
    const count = await Product.countDocuments({ categoryName: { $regex: /^Books/ } });
    console.log('Book count:', count);
    
    // Get sample books
    const books = await Product.find({ categoryName: { $regex: /^Books/ } }).limit(3).lean();
    console.log('Sample book:', JSON.stringify(books[0], null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

check();
