import React from 'react';
import { priceBuckets } from '../data/books';

const BooksPriceBuckets = () => {
  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Price</h2>

      <div className="flex flex-wrap gap-3">
        {priceBuckets.map((bucket) => (
          <button
            key={bucket.id}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium text-sm transition-colors"
          >
            {bucket.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BooksPriceBuckets;

