import React from 'react';
import { hotPress } from '../data/books';

const BooksHotPress = () => {
  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Hot Off The Press – <span className="text-orange-600">Up To 45% Off</span>
        </h2>
        <a href="#" className="text-sm text-blue-600 hover:underline font-medium">See all new releases</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {hotPress.map((book) => (
          <div
            key={book.id}
            className="border border-gray-100 rounded p-3 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative mb-3">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover rounded"
              />
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{book.title}</h3>
            <p className="text-xs text-gray-500 mb-2">by {book.author}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-orange-600">₹{book.price}</span>
              <span className="text-sm text-gray-400 line-through">₹{book.originalPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksHotPress;

