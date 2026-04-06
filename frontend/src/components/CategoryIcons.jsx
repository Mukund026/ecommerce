import React from 'react';
import { toyCategories } from '../data/toys';

const CategoryIcons = () => {
  return (
    <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Shop by category</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        {toyCategories.map(category => (
          <div key={category.id} className="group cursor-pointer text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full shadow-md group-hover:shadow-xl transition-all duration-200 flex items-center justify-center group-hover:scale-110 mx-auto mb-3">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            <h3 className="text-xs font-medium text-gray-900 group-hover:text-blue-600">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryIcons;

