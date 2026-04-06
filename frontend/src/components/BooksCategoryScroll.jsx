import React from 'react';
import { topCategories } from '../data/books';

const BooksCategoryScroll = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max">
          {topCategories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl group-hover:from-orange-100 group-hover:to-orange-200 transition-colors">
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksCategoryScroll;

