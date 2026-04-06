import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <a href="#" className="block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="aspect-square mb-3 overflow-hidden rounded-lg">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-800 text-center">{category.name}</h3>
    </a>
  );
};

export default CategoryCard;

