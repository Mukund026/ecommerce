import React from 'react';
import ProductCard from './ProductCard';
import { fashionProducts } from '../data/amazonFashion';

const ProductGrid = ({ title, products = [], cols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', loading = false }) => {
  if (loading) {
    return (
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 animate-pulse bg-gray-200 h-8 w-64 rounded"></h2>
        <div className={`grid ${cols} gap-6`}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-56 bg-gray-200 rounded-2xl mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      )}
      <div className={`grid ${cols} gap-6`}>
        {products?.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        )) || <p className="col-span-full text-center text-gray-500 py-8">No products found</p>}
      </div>
    </section>
  );
};

export default ProductGrid;
