import React from 'react';
import toast from 'react-hot-toast';

const GroceryProductCard = ({ product }) => {
  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
  };

  return (
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
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
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
  );
};

export default GroceryProductCard;

