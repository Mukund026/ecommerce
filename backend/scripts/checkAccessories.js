require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
  try {
    const count = await Product.countDocuments({ category: 'Mobile Accessories' });
    console.log(`Mobile Accessories count: ${count}`);
    
    const sample = await Product.findOne({ category: 'Mobile Accessories' }).lean();
    if (sample) {
      console.log('Sample product:', JSON.stringify(sample, null, 2));
    } else {
      console.log('No sample found');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Query error:', error.message);
  }
})();

