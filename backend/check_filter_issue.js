require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  console.log('\n=== Testing fresh-fruits query (CURRENT) ===');
  const freshQuery = {
    $or: [
      { categoryName: /fruit|vegetables|apple|banana|tomato|carrot|veg/i },
      { name: /fruit|vegetables|apple|banana|tomato|carrot|veg/i }
    ]
  };
  const freshProducts = await Product.find(freshQuery).limit(5).lean();
  console.log('Found:', freshProducts.length);
  freshProducts.forEach(p => console.log(`  - ${p.name} (${p.categoryName})`));

  console.log('\n=== Testing snacks-beverages query (CURRENT) ===');
  const snacksQuery = {
    $or: [
      { title: /chips|biscuit|cookies|snack|juice|tea|coffee|beverage|drink/i },
      { name: /chips|biscuit|cookies|snack|juice|tea|coffee|beverage|drink/i },
      { categoryName: /snacks|beverages/i }
    ]
  };
  const snackProducts = await Product.find(snacksQuery).limit(5).lean();
  console.log('Found:', snackProducts.length);
  snackProducts.forEach(p => console.log(`  - ${p.name} (${p.categoryName})`));

  console.log('\n=== Testing house-essentials query (CURRENT) ===');
  const houseQuery = {
    $or: [
      { title: /detergent|sanitizer|tissue|cleaner|soap|shampoo|brush|broom|household/i },
      { name: /detergent|sanitizer|tissue|cleaner|soap|shampoo|brush|broom|household/i },
      { categoryName: /household|home care|bath/i }
    ]
  };
  const houseProducts = await Product.find(houseQuery).limit(5).lean();
  console.log('Found:', houseProducts.length);
  houseProducts.forEach(p => console.log(`  - ${p.name} (${p.categoryName})`));

  // Test CORRECT filters with categoryName
  console.log('\n=== CORRECT fresh-fruits (using categoryName) ===');
  const correctFresh = await Product.find({ categoryName: 'Grocery' }).limit(5).lean();
  console.log('Found:', correctFresh.length);
  correctFresh.forEach(p => console.log(`  - ${p.name} (${p.categoryName})`));

  console.log('\n=== CORRECT bestsellers (using isBestSeller) ===');
  const correctBest = await Product.find({ isBestSeller: true }).limit(5).lean();
  console.log('Found:', correctBest.length);
  correctBest.forEach(p => console.log(`  - ${p.name} (${p.categoryName})`));
  
  mongoose.disconnect();
};

run().catch(e => { console.error(e); process.exit(1); });
