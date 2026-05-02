const http = require('http');

const bookId = '69edc9653ce8bd950cacb66b';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/books?limit=30',
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
    
    console.log('Total products from API:', products.length);
    console.log('Looking for book ID:', bookId);
    
    // Find the current book
    const currentBook = products.find(p => p._id === bookId);
    if (currentBook) {
      console.log('Current book found:', currentBook.title);
      console.log('Current book category:', currentBook.categoryName);
    } else {
      console.log('Current book NOT in first 30 results');
    }
    
    // Check how many romance books exist
    const romanceBooks = products.filter(p => p.categoryName === 'Books - Romance');
    console.log('Romance books in first 30:', romanceBooks.length);
    
    // Filter out current book and show similar
    const similar = products.filter(p => p._id !== bookId).slice(0, 6);
    console.log('\nSimilar products (excluding current):', similar.length);
    similar.forEach(p => {
      console.log(`  - ${p.title} (${p.categoryName})`);
    });
  });
});

req.on('error', (error) => {
  console.error('ERROR:', error.message);
});

req.end();
