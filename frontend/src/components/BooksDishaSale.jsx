import React from 'react';
import { dishaBooks } from '../data/books';

const BooksDishaSale = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 mx-4 mt-4 rounded-lg overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Up to 50% off <span className="text-yellow-300">DISHA</span>
          </h2>
          <a href="#" className="text-sm text-white hover:underline font-medium">See all</a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dishaBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="relative mb-3">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-32 object-cover rounded"
                />
                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {book.discount}% OFF
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">{book.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-orange-600">₹{book.price}</span>
                <span className="text-sm text-gray-400 line-through">₹{book.originalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksDishaSale;

