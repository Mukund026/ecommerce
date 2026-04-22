import React from 'react';
import { Link } from 'react-router-dom';

const ComputerProductCard = ({ product, size = 'normal' }) => {
  const imageHeight = size === 'large' ? 'h-48' : 'h-36 sm:h-44 md:h-40';
  
  return (
    <Link to={`/product/${product.id}`} className="block hover:no-underline focus:no-underline">
      <div className="bg-white p-3 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 group hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative mb-3">
        <img
          src={product.image || '/api/placeholder-image.jpg'}
          alt={product.name}
          className={`w-full ${imageHeight} aspect-[4/3] object-cover rounded-lg bg-gray-100`}
        />
        {/* Prime Badge */}
        {product.isPrime && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
              Prime
            </span>
          </div>
        )}
      </div>

      {/* Product Title */}
      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[2.5rem]">
        {product.name}
      </h3>

      {/* Rating */}
      {product.stars && (
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.stars) ? 'text-orange-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews?.toLocaleString()})</span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
        {product.originalPrice && (
          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice?.toLocaleString()}</span>
        )}
      </div>

      {/* Discount */}
      {product.discount && (
        <div className="mb-2">
          <span className="text-sm text-green-600 font-medium">
            {product.discount}% off
          </span>
        </div>
      )}

      {/* Save Extra */}
      {product.saveExtra && (
        <p className="text-xs text-orange-600 mb-2">Save extra with no cost EMI</p>
      )}
    </div>
    </Link>
  );
};

export default ComputerProductCard;
