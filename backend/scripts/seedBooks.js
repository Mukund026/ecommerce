require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding books');
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1);
  }
};

// Categorize books based on title keywords
const categorizeBook = (title) => {
  const lowerTitle = title.toLowerCase();
  
  // Children books keywords
  const childrenKeywords = ['child', 'children', 'kids', 'kid', 'baby', 'toddler', 'fairy', 'nursery', 'bedtime', 'disney', 'cartoon', 'pooh', 'potter', 'narnia', 'alice', 'wonderland', 'wizard', 'oz', 'grimm', 'andersen', 'seuss', 'dahl', 'rowling'];
  if (childrenKeywords.some(k => lowerTitle.includes(k))) return 'Books - Children';
  
  // Exam books keywords
  const examKeywords = ['exam', 'test', 'prep', 'preparation', 'upsc', 'ssc', 'bank', 'gate', 'jee', 'neet', 'cat', 'mat', 'gre', 'gmat', 'sat', 'ielts', 'toefl', 'competitive', 'guide', 'handbook', 'manual', 'workbook', 'practice', 'question', 'solve', 'solution', 'arithmetic', 'algebra', 'geometry', 'calculus', 'physics', 'chemistry', 'biology', 'mathematics', 'quantitative', 'aptitude', 'reasoning'];
  if (examKeywords.some(k => lowerTitle.includes(k))) return 'Books - Exam';
  
  // History books keywords
  const historyKeywords = ['history', 'historical', 'ancient', 'medieval', 'war', 'civil war', 'world war', 'revolution', 'empire', 'dynasty', 'kingdom', 'biography', 'memoir', 'autobiography', 'life of', 'story of', 'chronicle', 'era', 'age of', 'century', 'past', 'heritage', 'civilization'];
  if (historyKeywords.some(k => lowerTitle.includes(k))) return 'Books - History';
  
  // Romance books keywords
  const romanceKeywords = ['romance', 'romantic', 'love', 'heart', 'kiss', 'wedding', 'marriage', 'bride', 'groom', 'valentine', 'affair', 'passion', 'desire', 'beloved', 'darling', 'sweetheart', 'relationship', 'dating', 'couple'];
  if (romanceKeywords.some(k => lowerTitle.includes(k))) return 'Books - Romance';
  
  // Science books keywords
  const scienceKeywords = ['science', 'scientific', 'physics', 'chemistry', 'biology', 'astronomy', 'cosmos', 'universe', 'planet', 'evolution', 'genetics', 'dna', 'quantum', 'relativity', 'theory', 'research', 'discovery', 'experiment', 'laboratory', 'technology', 'engineering', 'medicine', 'medical', 'health', 'nature', 'environment', 'ecology', 'climate'];
  if (scienceKeywords.some(k => lowerTitle.includes(k))) return 'Books - Science';
  
  // Default to General
  return 'Books - General';
};

// Generate realistic price based on category
const generatePrice = (category) => {
  const basePrices = {
    'Books - Children': { min: 150, max: 500 },
    'Books - Exam': { min: 200, max: 800 },
    'Books - History': { min: 250, max: 700 },
    'Books - Romance': { min: 150, max: 400 },
    'Books - Science': { min: 300, max: 900 },
    'Books - General': { min: 150, max: 600 }
  };
  
  const range = basePrices[category] || basePrices['Books - General'];
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
};

// Generate stars and reviews
const generateRating = () => {
  const stars = (3 + Math.random() * 2).toFixed(1);
  const reviews = Math.floor(Math.random() * 5000) + 50;
  return { stars: parseFloat(stars), reviews };
};

const seedBooks = async () => {
  try {
    await connectDB();
    
    const csvPath = path.join(__dirname, '../books_data/books.csv');
    const books = [];
    
    // Read CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv({ separator: ';', quote: '"' }))
        .on('data', (row) => {
          // Skip header row if it exists
          if (row.ISBN && row.ISBN !== 'ISBN') {
            books.push(row);
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });
    
    console.log(`Found ${books.length} books in CSV`);
    
    // Process and categorize books
    const processedBooks = [];
    const categoryCounts = {};
    
    for (const book of books) {
      const title = book['Book-Title'] || book['Title'] || 'Unknown Title';
      const author = book['Book-Author'] || book['Author'] || 'Unknown Author';
      const imageUrl = book['Image-URL-L'] || book['Image-URL-M'] || book['Image-URL-S'] || '';
      
      const category = categorizeBook(title);
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      
      const price = generatePrice(category);
      const listPrice = Math.floor(price * (1.2 + Math.random() * 0.5));
      const { stars, reviews } = generateRating();
      
      processedBooks.push({
        name: title,
        title: title,
        price: price,
        listPrice: listPrice,
        category: 'Books',
        categoryName: category,
        subcategory: category.replace('Books - ', ''),
        image: imageUrl,
        imgUrl: imageUrl,
        stars: stars,
        reviews: reviews,
        isBestSeller: Math.random() > 0.8,
        description: `By ${author}. Published in ${book['Year-Of-Publication'] || 'Unknown'}.`,
        seller: null
      });
    }
    
    console.log('Category distribution:', categoryCounts);
    
    // Delete existing books
    await Product.deleteMany({ category: 'Books' });
    console.log('Cleared existing books');
    
    // Insert books in batches to avoid memory issues
    const batchSize = 1000;
    let inserted = 0;
    
    for (let i = 0; i < processedBooks.length; i += batchSize) {
      const batch = processedBooks.slice(i, i + batchSize);
      const result = await Product.insertMany(batch, { ordered: false });
      inserted += result.length;
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${result.length} books`);
    }
    
    console.log(`Successfully seeded ${inserted} books into database`);
    
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedBooks();
