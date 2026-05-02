const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(async () => {
    const Product = require('./models/Product');
    try {
      const bookId = '69edc9653ce8bd950cacb66b';
      const book = await Product.findById(bookId);
      if (book) {
        console.log('BOOK FOUND:', JSON.stringify(book, null, 2));
      } else {
        console.log('Book not found in database for ID:', bookId);
        // Check what kind of IDs exist
        const count = await Product.countDocuments();
        console.log('Total products:', count);
        
        // Find any products that look like books
        const bookProducts = await Product.find({ 
          categoryName: { $in: ['Books', 'Books - Children', 'Books - Exam', 'Books - General', 'Books - History', 'Books - Romance', 'Books - Science'] }
        }).limit(5);
        console.log('Sample books:', bookProducts.map(p => ({ id: p._id, title: p.title, categoryName: p.categoryName })));
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
