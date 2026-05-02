const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/books?limit=5',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const response = JSON.parse(data);
    console.log('Products count:', response.products?.length || 0);
    if (response.products && response.products.length > 0) {
      console.log('First product:', JSON.stringify(response.products[0], null, 2));
    }
  });
});

req.on('error', (error) => {
  console.error('ERROR:', error.message);
});

req.end();
