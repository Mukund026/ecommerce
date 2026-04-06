import React from 'react';
import GroceryProductCard from './GroceryProductCard';

const dummyProducts = [
  {
    id: 1,
    name: 'Fresh Red Apples - Premium Quality',
    price: 199,
    originalPrice: 249,
    discount: 20,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 49,
    originalPrice: 60,
    discount: 18,
    weight: '6 pcs',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Fresh Spinach (Palak)',
    price: 29,
    originalPrice: 35,
    discount: 17,
    weight: '250 g',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Amul Gold Full Cream Milk',
    price: 68,
    originalPrice: 72,
    discount: 6,
    weight: '1 L',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Britannia Bread White',
    price: 35,
    originalPrice: 40,
    discount: 13,
    weight: '400 g',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Lay\'s Classic Salted Chips',
    price: 39,
    originalPrice: 50,
    discount: 22,
    weight: '52 g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Tropicana Orange Juice',
    price: 95,
    originalPrice: 120,
    discount: 21,
    weight: '1 L',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Surf Excel Liquid Detergent',
    price: 324,
    originalPrice: 399,
    discount: 19,
    weight: '1 L',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop'
  }
];

const GroceryProductGrid = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Best Sellers</h3>
        <button className="text-sm text-orange-600 font-medium hover:underline">
          See all
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyProducts.map((product) => (
          <GroceryProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default GroceryProductGrid;

