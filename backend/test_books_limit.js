const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/books?limit=50',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const response = JSON.parse(data);
    console.log('Total count from API:', response.totalCount);
    console.log('Products returned:', response.products?.length || 0);
    if (response.products && response.products.length > 0) {
      console.log('IDs:', response.products.slice(0,10).map(p => p._id));
    }
  });
});

req.on('error', (error) => {
  console.error('ERROR:', error.message);
});

req.end();
