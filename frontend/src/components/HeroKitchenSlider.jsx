// Note: Requires Swiper installation
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

const HeroKitchenSlider = () => {
  const slides = [
    {
      bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      title: 'Home & kitchen finds',
      subtitle: 'Min. 60% off',
      cta: 'Shop Now'
    },
    {
      bg: 'bg-gradient-to-r from-blue-600 to-blue-700',
      title: 'Amazon Basics',
      subtitle: 'Up to 50% off kitchen essentials',
      cta: 'Explore'
    }
  ];

  return (
    <section className="mb-12">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`${slide.bg} text-white py-20 px-6 sm:px-12 lg:px-20 text-center rounded-2xl`}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-lg">
                {slide.subtitle}
              </p>
              <button className="bg-white text-orange-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105">
                {slide.cta}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroKitchenSlider;
