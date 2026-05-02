// Quick test file to simulate the frontend API call
const https = require('https');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/books/69edc9653ce8bd950cacb66b',
  method: 'GET'
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const response = JSON.parse(data);
    console.log('Full response:', JSON.stringify(response, null, 2));
    
    // This is what frontend does:
    const bookData = response.data?.product || response.data;
    console.log('bookData:', JSON.stringify(bookData, null, 2));
    
    if (!bookData || !bookData._id) {
      console.log('ERROR: Book not found - bookData is invalid');
    } else {
      console.log('SUCCESS: Book found', bookData.name);
    }
  });
});

req.on('error', (error) => {
  console.error('ERROR:', error.message);
});

req.end();
