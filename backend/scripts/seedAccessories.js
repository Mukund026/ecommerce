require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding accessories');
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1);
  }
};

const seedAccessories = async () => {
  try {
    await connectDB();

    // Read accessories JSON
    const jsonPath = path.join(__dirname, '../data/mobileAccessories.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const accessoriesData = JSON.parse(jsonData);

    // Filter valid
    const validAccessories = accessoriesData.filter(item => 
      item.name && typeof item.price === 'number' && item.category === 'Mobile Accessories'
    );

    console.log(`Found ${validAccessories.length} accessories to seed`);

    // Delete existing accessories only
    await Product.deleteMany({ category: 'Mobile Accessories' });
    console.log('Cleared existing Mobile Accessories');

    // Insert new
    const seeded = await Product.insertMany(validAccessories);
    console.log(`Successfully seeded ${seeded.length} Mobile Accessories`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedAccessories();

