require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    await connectDB();

    // Read JSON file
    const jsonPath = path.join(__dirname, '../data/completeProducts.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const productsData = JSON.parse(jsonData);

    // Filter valid products: must have name, price, category
    const validProducts = productsData.filter(item => 
      item.name && typeof item.price === 'number' && item.category
    ).map(item => ({
      name: item.name,
      title: item.name,
      price: item.price,
      listPrice: item.price * 1.3,
      category: item.category,
      categoryName: item.category,
      image: item.image || '',
      imgUrl: item.image || '',
      stars: (4 + Math.random()).toFixed(1),
      reviews: Math.floor(Math.random() * 5000) + 100,
      isBestSeller: Math.random() > 0.7,
      description: item.description || '',
      seller: null  // Default for now
    }));

    console.log(`Found ${validProducts.length} valid products to seed`);

    // Delete existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const seeded = await Product.insertMany(validProducts);
    console.log(`Successfully seeded ${seeded.length} products into 'products' collection`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedProducts();
