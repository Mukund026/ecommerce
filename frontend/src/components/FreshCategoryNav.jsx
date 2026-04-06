import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'Featured',
  'Supersaver',
  'Atta & flours',
  'Rice',
  'Whole grains',
  'Poha',
  'Millet & other flours',
  'Organic',
  'Tea, coffee & drink mixes',
  'Chips & biscuits',
  'Bath & body'
];

const FreshCategoryNav = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto whitespace-nowrap">
      <div className="flex gap-6">
        {categories.map((category, index) => (
          <Link 
            key={index}
            to={`/fresh/${category.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')}`} 
            className="text-sm font-medium text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FreshCategoryNav;

