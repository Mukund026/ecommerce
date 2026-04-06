import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomeKitchenProductCard = ({ product }) => {
  const { addToCart } = React.useContext(AuthContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group bg-white hover:shadow-lg transition-all duration-200 rounded-lg overflow-hidden border hover:border-orange-200 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 sm:h-52 bg-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% off
          </div>
        )}
        {product.prime && (
          <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xs font-bold text-gray-900">Prime</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 leading-tight group-hover:text-orange-600">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 
                  (i === Math.floor(product.rating) && product.rating % 1 >= 0.5 ? 'text-yellow-400 fill-current' : 'text-gray-300')}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="space-y-1 mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          {product.delivery && (
            <p className="text-xs text-green-600 font-medium">{product.delivery}</p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Add to Cart
        </button>

        <div className="mt-2 flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-gray-500">FREE Returns</span>
          <span className="text-xs text-orange-600 font-medium">Available</span>
        </div>
      </div>
    </Link>
  );
};

export default HomeKitchenProductCard;
