const http = require('http');

const testCases = [
  { name: 'Get book by ID', path: '/api/books/69edc9653ce8bd950cacb66b' },
  { name: 'Get books without category', path: '/api/books?limit=5' },
  { name: 'Get books with category param', path: '/api/books?limit=5&category=Books%20-%20Romance' }
];

const runTest = (index) => {
  if (index >= testCases.length) {
    console.log('All tests done');
    return;
  }
  
  const test = testCases[index];
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: test.path,
    method: 'GET'
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      const response = JSON.parse(data);
      console.log(`\n=== TEST ${index + 1}: ${test.name} ===`);
      console.log('Path:', test.path);
      console.log('Response keys:', Object.keys(response));
      
      if (response.product) {
        console.log('Product title:', response.product.title);
        console.log('Product category:', response.product.categoryName);
      }
      
      if (response.products) {
        console.log('Products count:', response.products.length);
        if (response.products.length > 0) {
          console.log('First product category:', response.products[0].categoryName);
        }
      }
      
      runTest(index + 1);
    });
  });
  
  req.on('error', (e) => console.error('Error:', e));
  req.end();
};

runTest(0);
