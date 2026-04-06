import React from 'react';
import BooksProductCard from './BooksProductCard';
import { bookProducts } from '../data/books';

const BooksProductGrid = () => {
  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Books
        </h2>
        <span className="text-sm text-gray-500">
          1-12 of over 1,25,000 results for <span className="text-gray-900 font-medium">Books</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {bookProducts.map((book) => (
          <BooksProductCard key={book.id} book={book} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-6 text-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-2.5 rounded-full transition-colors shadow-sm">
          Load More Books
        </button>
      </div>
    </div>
  );
};

export default BooksProductGrid;

