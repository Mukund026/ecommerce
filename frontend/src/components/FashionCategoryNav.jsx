import React from 'react';
import { fashionCategories } from '../data/amazonFashion';

const FashionCategoryNav = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 lg:px-8">
      <div className="flex overflow-x-auto scrollbar-hide py-3 gap-6 text-sm font-medium text-gray-700">
        {fashionCategories.map((category, index) => (
          <a
            key={index}
            href={category.href}
            className={`whitespace-nowrap pb-3 border-b-2 flex-shrink-0 ${
              category.active
                ? 'border-orange-500 text-orange-600 font-bold'
                : 'border-transparent hover:border-orange-500 hover:text-orange-600'
            }`}
          >
            {category.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default FashionCategoryNav;
