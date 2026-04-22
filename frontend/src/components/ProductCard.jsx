import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const getImageSrc = () => {
    const img = product.imgUrl || product.image;
    if (!img) return '/api/placeholder-image.jpg';
    if (typeof img === 'string' && img.startsWith('http')) return img;
    return `http://localhost:5000${typeof img === 'string' ? img : ''}`;
  };

  return (
    <Link to={`/product/${product.id}`} className="block hover:no-underline focus:no-underline">
      <div className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border hover:border-orange-200">
        {/* Image */}
        <div className="relative h-56 lg:h-60 p-4 flex items-center justify-center bg-gray-50 group-hover:bg-gray-50">
          <img 
            src={getImageSrc()} 
            alt={product.name || 'Product'}
            className="h-40 lg:h-44 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.src = '/api/placeholder-image.jpg'; }}
          />
          
          {/* Discount Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {discount}% off
          </div>

          {/* Best Seller Badge */}
          {product.isBestSeller && (
            <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg ml-12">
              Best Seller
            </div>
          )}

          {/* Quick Add */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-3">
            <div className="flex text-sm text-orange-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(product.rating || 4) ? 'text-orange-500' : 'text-gray-300'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({product.reviews || 0})</span>
          </div>

          {/* Price */}
          <div className="space-y-1 mb-4">
            <div className="text-2xl font-bold text-gray-900">
              ₹{product.price || 0}
            </div>
            <div className="text-lg font-medium text-gray-500 line-through">
              ₹{product.originalPrice || product.price || 0}
            </div>
            <div className="text-sm font-bold text-green-600">
              Save ₹{(product.originalPrice || 0) - (product.price || 0)}
            </div>
          </div>

          {/* Add to Cart */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm uppercase tracking-wide cursor-default"
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

