import React from 'react';
import { examBooks } from '../data/books';

const BooksExamBooks = () => {
  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{examBooks.title}</h2>
          <p className="text-orange-600 font-semibold">{examBooks.subtitle}</p>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:underline font-medium">See all</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {examBooks.categories.map((category, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer text-center"
          >
            <div className="w-full h-28 rounded-lg overflow-hidden mb-3">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksExamBooks;

