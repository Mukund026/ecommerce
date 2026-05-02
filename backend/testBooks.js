require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Product = require('./models/Product');

const checkBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const totalBooks = await Product.countDocuments({ 
      categoryName: { $in: ['Books - Children', 'Books - Exam', 'Books - General', 'Books - History', 'Books - Romance', 'Books - Science'] } 
    });
    console.log('Total books:', totalBooks);

    const childrenBooks = await Product.countDocuments({ categoryName: 'Books - Children' });
    console.log('Children books:', childrenBooks);

    // Check how many books have price field
    const withPrice = await Product.countDocuments({ 
      price: { $exists: true, $gt: 0 }, 
      categoryName: { $in: ['Books - Children', 'Books - Exam', 'Books - General', 'Books - History', 'Books - Romance', 'Books - Science'] } 
    });
    console.log('Books with price field:', withPrice);

    if (totalBooks > 0) {
      const sampleBooks = await Product.find({ 
        categoryName: { $in: ['Books - Children', 'Books - Exam', 'Books - General', 'Books - History', 'Books - Romance', 'Books - Science'] } 
      }).limit(3).lean();
      console.log('Sample books:', JSON.stringify(sampleBooks, null, 2));
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkBooks();
