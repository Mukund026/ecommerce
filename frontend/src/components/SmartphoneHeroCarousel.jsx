import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { heroBanners } from "../data/smartphones";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SmartphoneHeroCarousel = () => {
  return (
    <div className="relative w-full mb-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="h-[280px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden"
      >
        {heroBanners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
                <div className="px-6 md:px-12">
                  <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">
                    {banner.title}
                  </h2>
                  <p className="text-orange-400 text-lg md:text-xl font-semibold">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SmartphoneHeroCarousel;

