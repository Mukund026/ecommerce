require('dotenv').config();
const mongoose = require('mongoose');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const Product = require('./models/Product');
  
  const categories = [
    'Computer Accessories',
    'Computer Audio  Video Accessories',
    'Computer Cable Adapters',
    'Computer Components',
    'Computer Hard Drive Accessories',
    'Computer Monitor Accessories',
    'Computer Monitors',
    'Computer Security Cables',
    'Computer Uninterrupted Power Supply'
  ];
  
  for (const cat of categories) {
    const count = await Product.countDocuments({ categoryName: cat });
    console.log(`${cat}: ${count}`);
  }
  
  mongoose.disconnect();
};

run().catch(e => { console.error(e); process.exit(1); });

