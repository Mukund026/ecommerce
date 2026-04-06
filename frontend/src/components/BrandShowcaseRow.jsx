import React from 'react';
import { nikeBestSellers } from '../data/amazonFashion';

const BrandShowcaseRow = () => {
  const scrollLeft = () => {
    const container = document.getElementById('nike-showcase');
    container.scrollBy({ left: -340, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById('nike-showcase');
    container.scrollBy({ left: 340, behavior: 'smooth' });
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Nike Best Sellers</h2>
        <div className="flex items-center gap-2 text-sm">
          <button onClick={scrollLeft} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg">
            ←
          </button>
          <span className="text-gray-500">Scroll to see more</span>
          <button onClick={scrollRight} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg">
            →
          </button>
        </div>
      </div>
      
      <div id="nike-showcase" className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 -mb-6">
        {nikeBestSellers.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-48 hover:scale-105 transition-transform duration-200 group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:border-orange-200 hover:shadow-2xl">
              <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center group-hover:bg-orange-50">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="h-36 w-36 object-contain mx-auto"
                />
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Best Seller
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-sm text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(1,234)</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {product.price}
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandShowcaseRow;
