const http = require('http');

// Test the full flow as the frontend would
const bookId = '69edc9653ce8bd950cacb66b';

// Step 1: Get the specific book
const getBookOptions = {
  hostname: 'localhost',
  port: 5000,
  path: `/api/books/${bookId}`,
  method: 'GET'
};

const req1 = http.request(getBookOptions, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const response = JSON.parse(data);
    console.log('=== STEP 1: GET BOOK ===');
    console.log('Book found:', response.product ? 'YES' : 'NO');
    
    if (response.product) {
      const book = response.product;
      console.log('Book title:', book.title);
      console.log('Book category:', book.categoryName);
      
      // Step 2: Get similar books by category
      const category = book.categoryName;
      const similarOptions = {
        hostname: 'localhost',
        port: 5000,
        path: `/api/books?limit=30&category=${encodeURIComponent(category)}`,
        method: 'GET'
      };
      
      const req2 = http.request(similarOptions, (res2) => {
        let data2 = '';
        res2.on('data', (chunk) => { data2 += chunk; });
        res2.on('end', () => {
          const response2 = JSON.parse(data2);
          console.log('\n=== STEP 2: GET SIMILAR BOOKS ===');
          console.log('Total books returned:', response2.products?.length || 0);
          
          // Filter out current book
          const similarBooks = (response2.products || []).filter(p => p._id !== bookId);
          console.log('After excluding current book:', similarBooks.length);
          
          console.log('\nSimilar books to display:');
          similarBooks.slice(0, 6).forEach((b, i) => {
            console.log(`  ${i+1}. ${b.title}`);
          });
        });
      });
      req2.on('error', (e) => console.error('Error:', e));
      req2.end();
    }
  });
});

req1.on('error', (e) => console.error('Error:', e));
req1.end();
