import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const FreshProductCard = ({ product }) => {
  const { addToCart, user } = useContext(AuthContext);

  const USD_TO_INR = 40;

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
  const discount = displayOriginalPrice > displayPrice ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100) : 0;


  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    const result = await addToCart(product.id);
    if (result.success) {
      toast.success("Added to cart successfully!");
    } else {
      toast.error(result.message || "Failed to add to cart");
    }
  };

  return (
<Link to={`/product/${product._id || product.slug || product.id || 'fresh-milk-1l'}`} className="block">

      <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1 group relative">
        {/* Best Seller Badge */}
        {product.isBestSeller && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            Best Seller
          </div>
        )}
        
        <div className="aspect-square mb-3 overflow-hidden rounded-lg">
        <img 
        src={product.imgUrl || product.image || ''}
        alt={product.name || product.title || 'Fresh product'}
            className="w-full h-full object-contain hover:scale-105 transition-transform group-hover:scale-105"
            onError={(e) => {
              const productName = (product.name || product.title || 'fresh-grocery').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-') || 'grocery';
              e.target.src = `https://source.unsplash.com/300x300/?${productName}`;
            }}
          />

        </div>
        
        {discount > 0 && (
          <div className="mb-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              {discount}% OFF
            </span>
          </div>
        )}
        
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-gray-900">₹{displayPrice.toLocaleString('en-IN')}</span>
          {displayOriginalPrice && (
            <span className="text-sm text-gray-500 line-through">₹{displayOriginalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        
        <div className="flex items-center text-xs text-gray-600 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 fill-current ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.0.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1">({product.reviews || 0})</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default FreshProductCard;
