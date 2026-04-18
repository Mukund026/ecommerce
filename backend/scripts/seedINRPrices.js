const fs = require('fs');
const path = require('path');

const freshProductsPath = path.join(__dirname, '..', 'data', 'freshProducts.json');
const groceryProductsPath = path.join(__dirname, '..', 'data', 'groceryProducts.json');
const completeProductsPath = path.join(__dirname, '..', 'data', 'completeProducts.json');

const freshData = JSON.parse(fs.readFileSync(freshProductsPath, 'utf8'));
const groceryData = JSON.parse(fs.readFileSync(groceryProductsPath, 'utf8'));
const completeData = JSON.parse(fs.readFileSync(completeProductsPath, 'utf8'));

const INR_MULTIPLIER = 83;

// Multiply all prices by 83 for INR
const multiplyPrices = (products) => {
  products.forEach(p => {
    if (p.price) {
      p.price *= INR_MULTIPLIER;
    }
    if (p.listPrice || p.originalPrice) {
      p.listPrice = (p.listPrice || p.originalPrice || p.price) * INR_MULTIPLIER;
    }
    p.originalPrice = p.listPrice || p.originalPrice;
  });
};

// Apply to all
multiplyPrices(freshData);
multiplyPrices(groceryData);
multiplyPrices(completeData);

// Save
fs.writeFileSync(freshProductsPath, JSON.stringify(freshData, null, 2));
fs.writeFileSync(groceryProductsPath, JSON.stringify(groceryData, null, 2));
fs.writeFileSync(completeProductsPath, JSON.stringify(completeData, null, 2));

console.log(`✅ All prices multiplied by ${INR_MULTIPLIER} – now INR!`);
