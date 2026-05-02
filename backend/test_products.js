const http = require('http');

const endpoints = [
  '/api/products/bestsellers',
  '/api/products/fresh-fruits',
  '/api/products/snacks-beverages',
  '/api/products/house-essentials'
];

function testEndpoint(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log(`\n=== ${path} ===`);
          console.log('Status:', res.statusCode);
          console.log('Data count:', parsed.data?.length || 0);
          console.log('First item name:', parsed.data?.[0]?.name || 'No data');
        } catch (e) {
          console.log(`\n=== ${path} ===`);
          console.log('Status:', res.statusCode);
          console.log('Error parsing:', e.message);
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`\n=== ${path} ===`);
      console.log('ERROR:', error.message);
      resolve();
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing backend endpoints...');
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
  }
}

runTests();
