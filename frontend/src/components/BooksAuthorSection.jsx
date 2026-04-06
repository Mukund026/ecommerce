import React from 'react';
import { authorOfMonth } from '../data/books';

const BooksAuthorSection = () => {
  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Author of the Month</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Author Photo */}
          <div className="flex-shrink-0">
            <img
              src={authorOfMonth.image}
              alt={authorOfMonth.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-orange-200"
            />
          </div>

          {/* Author Background */}
          <div className="flex-1 relative min-h-[200px] rounded-lg overflow-hidden">
            <img
              src={authorOfMonth.background}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{authorOfMonth.name}</h3>
              <p className="text-white/90 font-medium">{authorOfMonth.description}</p>
            </div>
          </div>

          {/* Featured Book */}
          <div className="flex-shrink-0 bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500 mb-2">Featured Book</p>
            <img
              src={authorOfMonth.featuredBook.image}
              alt={authorOfMonth.featuredBook.title}
              className="w-24 h-36 object-cover rounded mx-auto mb-3 shadow-md"
            />
            <p className="text-sm font-medium text-gray-800 mb-2">{authorOfMonth.featuredBook.title}</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-orange-600">₹{authorOfMonth.featuredBook.price}</span>
              <span className="text-sm text-gray-400 line-through">₹{authorOfMonth.featuredBook.originalPrice}</span>
            </div>
            <span className="inline-block mt-2 text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
              {authorOfMonth.featuredBook.discount}% off
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksAuthorSection;

