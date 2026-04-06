import React from 'react';

const subCategories = [
  'Past Purchases', 'Alexa Lists', 'Deals', 'Fruits & Vegetables', 
  'Atta Rice & Grains', 'Oil & Ghee', 'Milk & Dairy', 'Chips & Biscuits', 
  'Eggs Meat & Fish', 'Bath & Body', 'Laundry Detergents', 'Baby Care'
];

const SubCategoryMenu = () => {
  return (
    <div className="bg-gray-100 border-b">
      <div className="max-w-screen-2xl mx-auto px-4 py-2 overflow-x-auto">
        <div className="flex items-center gap-4 min-w-max">
          {subCategories.map((category, index) => (
            <button
              key={index}
              className="text-sm text-gray-700 hover:text-orange-600 whitespace-nowrap transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryMenu;

