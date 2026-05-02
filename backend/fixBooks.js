require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Product = require('./models/Product');

const fixBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Categories that are book categories
    const bookCategories = [
      'Books - Children',
      'Books - Exam', 
      'Books - General',
      'Books - History',
      'Books - Romance',
      'Books - Science'
    ];

    // Base prices by category
    const basePrices = {
      'Books - Children': { min: 150, max: 500 },
      'Books - Exam': { min: 200, max: 800 },
      'Books - History': { min: 250, max: 700 },
      'Books - Romance': { min: 150, max: 400 },
      'Books - Science': { min: 300, max: 900 },
      'Books - General': { min: 150, max: 600 }
    };

    const getRandomPrice = (category) => {
      const range = basePrices[category] || basePrices['Books - General'];
      return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    };

    // Process in batches
    const batchSize = 1000;
    let processed = 0;
    let totalFixed = 0;

    while (true) {
      // Find books missing price or with price 0
      const booksToFix = await Product.find({
        categoryName: { $in: bookCategories },
        $or: [
          { price: { $exists: false } },
          { price: { $eq: null } },
          { price: { $eq: 0 } }
        ]
      }).limit(batchSize).lean();

      if (booksToFix.length === 0) break;

      for (const book of booksToFix) {
        const price = getRandomPrice(book.categoryName);
        const listPrice = Math.floor(price * (1.2 + Math.random() * 0.3));

        await Product.updateOne(
          { _id: book._id },
          {
            $set: {
              price: price,
              listPrice: listPrice,
              imgUrl: book.image || '/api/placeholder-image.jpg',
              image: book.image || '/api/placeholder-image.jpg',
              stars: Math.round((3 + Math.random() * 2) * 10) / 10,
              reviews: Math.floor(Math.random() * 5000)
            }
          }
        );
        totalFixed++;
      }

      processed += booksToFix.length;
      console.log(`Processed ${processed} books, fixed ${totalFixed} so far...`);
    }

    console.log(`\nTotal books fixed: ${totalFixed}`);

    // Now fix books missing listPrice (but have price)
    processed = 0;
    let listPriceFixed = 0;

    while (true) {
      const booksToFix = await Product.find({
        categoryName: { $in: bookCategories },
        price: { $exists: true, $gt: 0 },
        $or: [
          { listPrice: { $exists: false } },
          { listPrice: { $eq: null } }
        ]
      }).limit(batchSize).lean();

      if (booksToFix.length === 0) break;

      for (const book of booksToFix) {
        const listPrice = Math.floor(book.price * (1.2 + Math.random() * 0.3));

        await Product.updateOne(
          { _id: book._id },
          { $set: { listPrice: listPrice } }
        );
        listPriceFixed++;
      }

      processed += booksToFix.length;
      console.log(`Fixed ${listPriceFixed} listPrice fields...`);
    }

    console.log(`Total listPrice fixed: ${listPriceFixed}`);

    // Now fix books missing image URLs
    processed = 0;
    let imageFixed = 0;

    while (true) {
      const booksToFix = await Product.find({
        categoryName: { $in: bookCategories },
        $or: [
          { imgUrl: { $exists: false } },
          { imgUrl: { $eq: null } },
          { imgUrl: { $eq: '' } }
        ]
      }).limit(batchSize).lean();

      if (booksToFix.length === 0) break;

      for (const book of booksToFix) {
        await Product.updateOne(
          { _id: book._id },
          {
            $set: {
              imgUrl: book.image || '/api/placeholder-image.jpg',
              image: book.image || '/api/placeholder-image.jpg'
            }
          }
        );
        imageFixed++;
      }

      processed += booksToFix.length;
      console.log(`Fixed ${imageFixed} image fields...`);
    }

    console.log(`Total image fields fixed: ${imageFixed}`);

    // Now fix books missing stars/reviews
    processed = 0;
    let ratingFixed = 0;

    while (true) {
      const booksToFix = await Product.find({
        categoryName: { $in: bookCategories },
        $or: [
          { stars: { $exists: false } },
          { stars: { $eq: null } }
        ]
      }).limit(batchSize).lean();

      if (booksToFix.length === 0) break;

      for (const book of booksToFix) {
        await Product.updateOne(
          { _id: book._id },
          {
            $set: {
              stars: Math.round((3 + Math.random() * 2) * 10) / 10,
              reviews: Math.floor(Math.random() * 5000)
            }
          }
        );
        ratingFixed++;
      }

      processed += booksToFix.length;
      console.log(`Fixed ${ratingFixed} rating fields...`);
    }

    console.log(`Total rating fields fixed: ${ratingFixed}`);

    // Check final counts
    const totalBooks = await Product.countDocuments({ 
      categoryName: { $in: bookCategories } 
    });
    console.log('\n=== Final Counts ===');
    console.log('Total books:', totalBooks);

    const withPrice = await Product.countDocuments({ 
      categoryName: { $in: bookCategories },
      price: { $exists: true, $gt: 0 }
    });
    console.log('Books with valid price:', withPrice);

    const withListPrice = await Product.countDocuments({ 
      categoryName: { $in: bookCategories },
      price: { $exists: true, $gt: 0 },
      listPrice: { $exists: true, $gt: 0 }
    });
    console.log('Books with valid listPrice:', withListPrice);

    mongoose.connection.close();
    console.log('\nDone!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixBooks();
