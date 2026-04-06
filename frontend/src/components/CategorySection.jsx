import React from 'react';
import ProductRankCard from './ProductRankCard';

const CategorySection = ({ category }) => {
  const scrollLeft = (containerId) => {
    const container = document.getElementById(containerId);
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (containerId) => {
    const container = document.getElementById(containerId);
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
          {category.title}
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Page 1 of 10</span>
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
            See More →
          </a>
        </div>
      </div>

      {/* Product Row */}
      <div className="relative">
        <div id={`products-${category.title.replace(/\s+/g, '-').toLowerCase()}`} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mb-4 xl:grid xl:grid-cols-4 xl:gap-6 xl:overflow-visible">
          {category.products.map((product) => (
            <div key={product.rank} className="flex-shrink-0 w-56 xl:w-full xl:max-w-xs">
              <ProductRankCard product={product} />
            </div>
          ))}
        </div>
        
        {/* Carousel Arrows */}
        <button 
          onClick={() => scrollLeft(`products-${category.title.replace(/\s+/g, '-').toLowerCase()}`)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow border z-10 hidden xl:flex"
        >
<svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
</svg>
        </button>
        <button 
          onClick={() => scrollRight(`products-${category.title.replace(/\s+/g, '-').toLowerCase()}`)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow border z-10 hidden xl:flex"
        >
<svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
        </button>
      </div>
    </section>
  );
};

export default CategorySection;
