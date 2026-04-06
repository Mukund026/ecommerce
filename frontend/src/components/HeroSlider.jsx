import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import firstimg from "../assets/firstimg.png"
import sec from "../assets/second.png"
import third from "../assets/third.png"
import fourth from "../assets/forth.png"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  firstimg,
  sec,
  third,
  fourth
];

export default function HeroSlider() {
  return (
    <div className="w-full mb-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="h-[300px] md:h-[350px] rounded-lg overflow-hidden"
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
