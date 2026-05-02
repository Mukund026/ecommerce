const http = require('http');

const endpoints = [
  '/api/products/bestsellers',
  '/api/products/fresh-fruits',
  '/api/products/snacks-beverages',
  '/api/products/house-essentials'
];

function testEndpoint(path) {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5000' + path, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const firstItem = parsed.data?.[0];
          console.log(`${path}:`);
          console.log(`  Count: ${parsed.data?.length || 0}`);
          console.log(`  First: ${firstItem?.name || firstItem?.title || 'none'}`);
          console.log(`  Category: ${firstItem?.categoryName || 'none'}`);
        } catch (e) {
          console.log(`${path}: ERROR ${e.message}`);
        }
        resolve();
      });
    });
    req.on('error', (e) => {
      console.log(`${path}: REQUEST ERROR ${e.message}`);
      resolve();
    });
  });
}

async function runTests() {
  console.log('Testing FIXED endpoints...\n');
  for (const ep of endpoints) {
    await testEndpoint(ep);
  }
  console.log('\nDone!');
}

runTests();
