import React from 'react';

const BooksUsualBooks = () => {
  const usualBooksCategories = [
    { name: 'Bestsellers', icon: '📚' },
    { name: 'New Releases', icon: '🚀' },
    { name: 'Award Winners', icon: '🏆' },
    { name: 'Box Sets', icon: '📦' },
    { name: 'International', icon: '🌍' },
    { name: 'Indian Writing', icon: '🇮🇳' },
  ];

  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {usualBooksCategories.map((category, index) => (
          <a
            key={index}
            href="#"
            className="flex flex-col items-center p-4 border border-gray-100 rounded-lg hover:border-orange-300 hover:shadow-md transition-all"
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <span className="text-sm font-medium text-gray-700 text-center">
              {category.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BooksUsualBooks;

