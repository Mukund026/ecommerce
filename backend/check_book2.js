const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(async () => {
    const Product = require('./models/Product');
    try {
      const bookId = '69edc97f3ce8bd950cad4ab4';
      const book = await Product.findById(bookId);
      if (book) {
        console.log('BOOK FOUND:', JSON.stringify(book, null, 2));
      } else {
        console.log('Book not found in database for ID:', bookId);
        // Let's check total count
        const count = await Product.countDocuments();
        console.log('Total products:', count);
      }
    } catch (e) {
      console.log('Error:', e.message);
    }
    process.exit(0);
  })
  .catch(err => {
    console.log('Connection error:', err.message);
    process.exit(1);
  });
