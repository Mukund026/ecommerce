import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { brands } from "../data/smartphones";

import "swiper/css";
import "swiper/css/navigation";

const FavouriteBrands = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Shop by Your Favourite Brands</h2>
        <Link to="/" className="text-sm text-blue-600 hover:underline">See all brands</Link>
      </div>

      <div className="space-y-6">
        {brands.map((brand) => (
          <div key={brand.id} className="border-t pt-4 first:border-t-0 first:pt-0">
            {/* Brand Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded">
                <span className="text-lg font-bold text-gray-700">{brand.name[0]}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">{brand.name}</h3>
            </div>

            {/* Products Slider */}
            <Swiper
              modules={[Navigation]}
              navigation
              slidesPerView={2}
              spaceBetween={16}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 12 },
                480: { slidesPerView: 3, spaceBetween: 16 },
                640: { slidesPerView: 4, spaceBetween: 16 },
                768: { slidesPerView: 4, spaceBetween: 16 },
                1024: { slidesPerView: 5, spaceBetween: 16 },
                1280: { slidesPerView: 6, spaceBetween: 16 }
              }}
              className="pb-8"
            >
              {brand.products.map((product) => (
                <SwiperSlide key={product.id}>
                  <Link to={`/product/${product.id}`} className="block group">
                    <div className="border rounded p-3 hover:border-orange-400 transition-colors h-full">
                      {/* Discount Badge */}
                      <div className="mb-2">
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                          {product.discount}% off
                        </span>
                      </div>
                      
                      {/* Image */}
                      <div className="h-28 md:h-32 mb-3 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      
                      {/* Name */}
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600">
                        {product.name}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteBrands;

