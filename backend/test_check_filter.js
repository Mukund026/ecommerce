const http = require('http');

// Exactly mimic what frontend does
const bookId = '69edc9653ce8bd950cacb66b';

// Step 1: Get the book
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
    
    if (response.product) {
      const book = response.product;
      console.log('Book title:', book.title);
      console.log('Book category:', book.categoryName);
      
      // Step 2: Get similar books - exactly like frontend code
      const category = book.categoryName;
      const categoryParam = category !== 'Books' ? `&category=${encodeURIComponent(category)}` : '';
      const path = `/api/books?limit=30${categoryParam}`;
      
      console.log('\n=== STEP 2: GET SIMILAR BOOKS ===');
      console.log('Request path:', path);
      
      const similarOptions = {
        hostname: 'localhost',
        port: 5000,
        path: path,
        method: 'GET'
      };
      
      const req2 = http.request(similarOptions, (res2) => {
        let data2 = '';
        res2.on('data', (chunk) => { data2 += chunk; });
        res2.on('end', () => {
          const response2 = JSON.parse(data2);
          const products = response2.products || [];
          
          console.log('Total books returned:', products.length);
          
          // Check categories
          const categories = {};
          products.forEach(p => {
            categories[p.categoryName] = (categories[p.categoryName] || 0) + 1;
          });
          console.log('Categories in results:', categories);
          
          // Filter out current book
          const similarBooks = products.filter(p => p._id !== bookId);
          console.log('After excluding current book:', similarBooks.length);
          
          console.log('\nSimilar books to display:');
          similarBooks.slice(0, 6).forEach((b, i) => {
            console.log(`  ${i+1}. ${b.title} (${b.categoryName})`);
          });
        });
      });
      req2.on('error', (e) => console.error('Error:', e));
      req2.end();
    } else {
      console.log('Book NOT found');
    }
  });
});

req1.on('error', (e) => console.error('Error:', e));
req1.end();
