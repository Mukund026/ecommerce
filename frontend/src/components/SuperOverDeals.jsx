import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

const SuperOverDeals = ({ products = [] }) => {
  const hotDealsProducts = products.slice(0, 8).map(p => ({
    ...p,
    discount: p.originalPrice && p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0,
    originalPrice: p.originalPrice || p.price * 1.2
  })); 

  return (
    <div className="mb-6">
      {/* Large Promotional Banner - Sports Stadium Style */}
      <div 
        className="rounded-lg p-6 mb-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0d47a1 50%, #1565c0 100%)'
        }}
      >
        {/* Stadium effect overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20"></div>
        </div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-yellow-400">SUPER OVER</span> DEALS
            </h2>
            <p className="text-blue-200">Lightning fast deals - Grab them before they vanish!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold">
              ⚡ Flash Sale
            </div>
            <div className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold">
              Up to 40% Off
            </div>
          </div>
        </div>
      </div>

      {/* Product Slider */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Hot Deals</h3>
          <Link to="/smartphones/hotdeals" className="text-sm text-blue-600 hover:underline" data-discover="true">See all</Link>
        </div>
        
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 12 },
            480: { slidesPerView: 3, spaceBetween: 16 },
            640: { slidesPerView: 4, spaceBetween: 16 },
            768: { slidesPerView: 5, spaceBetween: 16 },
            1024: { slidesPerView: 6, spaceBetween: 16 }
          }}
          className="pb-8"
        >
{hotDealsProducts.map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`}>
              <Link to={`/smartphones/${item._id || item.id}`} className="block group">
                <div className="border rounded p-3 hover:border-orange-400 transition-colors h-full">
                  {/* Discount Badge */}
                  <div className="mb-2">
                    {item.discount > 0 && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                        {item.discount}% off
                      </span>
                    )}
                  </div>
                  
                  {/* Image */}
                  <div className="h-24 md:h-28 mb-3 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  {/* Name */}
                  <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600">
                    {item.name}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SuperOverDeals;
