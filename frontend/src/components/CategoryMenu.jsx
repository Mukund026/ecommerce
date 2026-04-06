import React from 'react';

const categories = [
  'All', 'Fresh', 'Bestsellers', 'Mobiles', 'Customer Service', 
  "Today's Deals", 'Prime', 'Fashion', 'Electronics', 'Home & Kitchen', 
  'Toys & Games', 'Books'
];

const CategoryMenu = ({ onFreshClick }) => {
  const handleClick = (category) => {
    if (category === 'Fresh' && onFreshClick) {
      onFreshClick();
    }
  };

  return (
    <div className="bg-orange-500 text-white px-4 py-2 overflow-x-auto">
      <div className="flex items-center gap-6 min-w-max">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleClick(category)}
            className="text-sm hover:underline whitespace-nowrap font-medium"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;

