import React from 'react';
import { useNavigate } from 'react-router-dom';

const groceryCategories = [
  { name: 'Fruits', icon: '🍎', color: 'bg-red-50', path: '/fresh/fruits-vegetables' },
  { name: 'Vegetables', icon: '🥬', color: 'bg-green-50', path: '/fresh/fruits-vegetables' },
  { name: 'Snacks', icon: '🍿', color: 'bg-yellow-50', path: '/fresh/snacks-biscuits' },
  { name: 'Dairy', icon: '🥛', color: 'bg-blue-50', path: '/fresh/milk-dairy' },
  { name: 'Beverages', icon: '🧃', color: 'bg-purple-50', path: '/fresh/tea-coffee-drink-mixes' },
{ name: 'Household', icon: '🧹', color: 'bg-gray-50', path: '/fresh/household' }
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Grocery Categories</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {groceryCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category.path)}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl`}>
              {category.icon}
            </div>
            <span className="text-sm font-medium text-gray-700">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;

