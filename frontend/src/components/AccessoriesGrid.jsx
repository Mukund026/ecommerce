import { Link } from "react-router-dom";
import { accessoriesProducts } from "../data/smartphones";

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const AccessoriesGrid = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Accessories Deals</h2>
        <Link to="/" className="text-sm text-blue-600 hover:underline">See all</Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {accessoriesProducts.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="border rounded p-3 hover:border-orange-400 transition-colors block"
          >
            {/* Discount Badge */}
            <div className="mb-2">
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                {product.discount}% off
              </span>
            </div>
            
            {/* Image */}
            <div className="h-28 mb-3 flex items-center justify-center">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
              />
            </div>
            
            {/* Name */}
            <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
              {product.name}
            </p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <RatingStars rating={product.rating} />
              <span className="text-xs text-blue-600">({product.reviews?.toLocaleString('en-IN')})</span>
            </div>
            
            {/* Prime Badge */}
            {product.prime && (
              <div className="mb-2">
                <span className="text-xs text-blue-600 font-medium">Prime</span>
              </div>
            )}
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesGrid;

