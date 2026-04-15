import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
<Link to={`/fresh/${category.slug}`} className="block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow no-underline">
      <div className="aspect-square mb-3 overflow-hidden rounded-lg">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-800 text-center">{category.name}</h3>
    </Link>
  );
};

export default CategoryCard;
