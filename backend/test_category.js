const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/books?category=Books%20-%20Romance&limit=30',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const response = JSON.parse(data);
    const products = response.products || [];
    console.log('Products returned:', products.length);
    products.forEach(p => {
      console.log(`  - ${p.title} (${p.categoryName})`);
    });
  });
});

req.on('error', (error) => {
  console.error('ERROR:', error.message);
});

req.end();
