import React from "react";
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
          className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-blue-600 ml-1">({rating})</span>
    </div>
  );
};

const AccessoriesDealsRow = ({ products = [], title = "Accessories Deals" }) => {
  const deals = products.map(p => ({
    id: p._id,
    name: p.product_name,
    price: p.discounted_price,
    originalPrice: p.retail_price,
    discount: p.retail_price > p.discounted_price ? Math.round(((p.retail_price - p.discounted_price) / p.retail_price) * 100) : 0,
    image: p.image,
    rating: p.product_rating || 4.0,
    reviews: p.overall_rating || 0
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <Link to="/smartphones/accessories-deals" className="text-sm text-blue-600 hover:underline">See all offers</Link>
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
        {deals.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/product/${item.id}`} className="block group">
              <div className="border rounded p-3 hover:border-orange-400 transition-colors h-full">
                {/* Discount Badge */}
                <div className="mb-2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                    {item.discount}% off
                  </span>
                </div>
                
                {/* Image */}
                <div className="h-24 md:h-28 mb-3 flex items-center justify-center">
                  <img
                    src={
                      item.image?.startsWith('http')
                        ? item.image
                        : `http://localhost:5000${item.image}`
                    }
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                
                {/* Name */}
                <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600">
                  {item.name}
                </p>
                
                {/* Rating */}
                <div className="mb-2">
                  <RatingStars rating={item.rating} />
                </div>
                
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
  );
};

export default AccessoriesDealsRow;

