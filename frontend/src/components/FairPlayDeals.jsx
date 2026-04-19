import { Link } from "react-router-dom";
import { useSmartphones } from "../hooks/useSmartphones";

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

const FairPlayDeals = () => {
  const { smartphones } = useSmartphones({ limit: 20 });
  const fairPlayProducts = smartphones.filter(p => p.price < 25000).slice(0,4).map(p => ({
    ...p,
    discount: p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0,
    brand: (p.name || '').split(' ')[0] || 'Xiaomi',
    rating: p.stars || 4.4
  }));
  return (
    <div className="mb-6">
      {/* Large Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-lg p-6 mb-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">FAIR PLAY DEALS</h2>
            <p className="text-blue-200">Best value smartphones under ₹25,000</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="bg-orange-500 text-white text-2xl font-bold px-4 py-2 rounded">32%</div>
              <p className="text-xs text-blue-200 mt-1">Avg Discount</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 text-white text-2xl font-bold px-4 py-2 rounded">₹15K</div>
              <p className="text-xs text-blue-200 mt-1">Avg Savings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Budget Smartphones</h3>
          <Link to="/smartphones/budget" className="text-sm text-blue-600 hover:underline" data-discover="true">See all</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
{fairPlayProducts.map((phone) => (
            <Link 
              key={phone._id || phone.id || Math.random()} 
              to={`/product/${phone._id || phone.id}`}
              className="border rounded p-3 hover:border-orange-400 transition-colors block"
            >
              {/* Discount Badge */}
              <div className="mb-2">
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                  {phone.discount}% off
                </span>
              </div>
              
              {/* Image */}
              <div className="h-28 mb-3 flex items-center justify-center">
                <img
                  src={phone.image}
                  alt={phone.name}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                />
              </div>
              
              {/* Brand */}
              <p className="text-xs text-gray-500 mb-1">{phone.brand}</p>
              
              {/* Name */}
              <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                {phone.name}
              </p>
              
              {/* Rating */}
              <div className="mb-2">
                <RatingStars rating={phone.rating} />
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ₹{phone.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{phone.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FairPlayDeals;

