import React from 'react';
import { topBrandDeals } from '../data/amazonFashion';

const BrandDealsGrid = () => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Top brands in deals</h2>
        <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold text-lg hover:underline">
          See all →
        </a>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {topBrandDeals.map((brand, index) => (
          <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <img 
              src={brand.image}
              alt={brand.name}
              className="w-full h-32 lg:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="text-white drop-shadow-lg">
                <h3 className="font-bold text-lg lg:text-xl mb-1">{brand.name}</h3>
                <p className="text-2xl font-black drop-shadow-2xl">{brand.offer}</p>
              </div>
            </div>
            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              {brand.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandDealsGrid;
