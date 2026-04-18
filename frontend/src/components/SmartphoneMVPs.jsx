import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-blue-600 ml-1 hover:underline cursor-pointer">{rating}</span>
    </div>
  );
};

const SmartphoneMVPs = ({ products = [] }) => {
  const displayProducts = products || [];
  if (!displayProducts.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">SMARTPHONES MVPs</h2>
          <Link to="/" className="text-sm text-blue-600 hover:underline">See all offers</Link>
        </div>
        <div className="text-gray-500 text-center py-8">No smartphones available at the moment</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">SMARTPHONES MVPs</h2>
        <Link to="/" className="text-sm text-blue-600 hover:underline">See all offers</Link>
      </div>
      
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 12 },
          480: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 16 },
          1280: { slidesPerView: 6, spaceBetween: 16 }
        }}
        className="pb-8"
      >
        {displayProducts.slice(0, 6).map((phone) => (
          <SwiperSlide key={phone._id || phone.id}>
            <Link to={`/product/${phone._id || phone.id}`} className="block group">
              <div className="border rounded p-3 hover:border-orange-400 transition-colors h-full">
                <div className="mb-2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                    {Math.round(phone.discount)}% off
                  </span>
                </div>
                <div className="h-32 md:h-40 mb-3 flex items-center justify-center">
                  <img
                    src={phone.image || phone.imgUrl}
                    alt={phone.name || phone.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{phone.brand}</p>
                <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600">
                  {phone.name || phone.title}
                </p>
                <div className="mb-2">
                  <RatingStars rating={phone.stars || phone.rating || 4.5} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{phone.price?.toLocaleString('en-IN') || '0'}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{(phone.originalPrice || phone.listPrice)?.toLocaleString('en-IN') || '0'}
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SmartphoneMVPs;
