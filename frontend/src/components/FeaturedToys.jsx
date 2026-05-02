import React from 'react';
import ToysProductCard from './ToysProductCard';

const FeaturedToys = ({ products = [] }) => {
  const displayProducts = products.length > 0 ? products.slice(0, 3) : [];

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-8">Featured Toys</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map(product => (
          <div key={product.id} className="group relative bg-gradient-to-br hover:from-pink-50 hover:to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border">
            <ToysProductCard product={product} />
            {/* Special badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
              Limited Stock
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedToys;
