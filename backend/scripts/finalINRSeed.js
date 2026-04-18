const fs = require('fs');
const path = require('path');

const paths = [
  path.join(__dirname, '..', 'data', 'freshProducts.json'),
  path.join(__dirname, '..', 'data', 'groceryProducts.json'),
  path.join(__dirname, '..', 'data', 'completeProducts.json')
];

paths.forEach(pathFile => {
  const data = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
  data.forEach(p => {
    // Multiply price by 83 if USD-like (low <100)
    if (p.price && p.price < 10) {
      p.price *= 83;
    }
    p.listPrice = p.listPrice ? p.listPrice * 83 : p.price * 1.15;
    p.originalPrice = p.originalPrice ? p.originalPrice * 83 : p.listPrice;
  });
  fs.writeFileSync(pathFile, JSON.stringify(data, null, 2));
  console.log(`Updated ${pathFile}`);
});

console.log('✅ All data files now have high INR prices!');

