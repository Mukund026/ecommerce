import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const GroceryProductCard = ({ product }) => {
  // Fallback INR prices for zero-price DB products
  let displayPrice = product.price || 0;
  if (displayPrice === 0) {
    const nameLower = (product.name || '').toLowerCase();
    if (nameLower.includes('atta') || nameLower.includes('flour')) displayPrice = 85;
    else if (nameLower.includes('rice')) displayPrice = 120;
    else if (nameLower.includes('milk') || nameLower.includes('dairy')) displayPrice = 65;
    else if (nameLower.includes('apple') || nameLower.includes('fruit') || nameLower.includes('vegetable')) displayPrice = 80;
    else if (nameLower.includes('oil') || nameLower.includes('ghee')) displayPrice = 220;
    else if (nameLower.includes('egg') || nameLower.includes('meat') || nameLower.includes('fish')) displayPrice = 280;
    else if (nameLower.includes('spice') || nameLower.includes('seasoning')) displayPrice = 45;
    else if (nameLower.includes('chip') || nameLower.includes('biscuit') || nameLower.includes('snack')) displayPrice = 35;
    else if (nameLower.includes('bread') || nameLower.includes('bakery')) displayPrice = 55;
    else displayPrice = 75; // default grocery
  }
  const displayOriginalPrice = product.originalPrice || Math.round(displayPrice * 1.15);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
  };


  return (
<Link to={`/product/${product._id || product.slug || product.id || 'fresh-milk-1l'}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-4 flex flex-col">
        <div className="relative mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 md:h-40 object-contain"
          />
          {product.discount && (
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br">
              {product.discount}% OFF
            </span>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
          
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-gray-900">₹{displayPrice}</span>
              {displayOriginalPrice > displayPrice && (
                <span className="text-sm text-gray-400 line-through">₹{displayOriginalPrice}</span>
              )}

            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroceryProductCard;

