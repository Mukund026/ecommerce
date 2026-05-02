import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import API from '../api/axios';

const TopBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const res = await API.get('/toys/brands');
        setBrands(res.data.brands || []);
      } catch (err) {
        console.error('Failed to fetch top brands:', err);
        setError('Failed to load brands');
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Toys from top brands</h2>
        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-1 min-w-[120px] h-24 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (error || brands.length === 0) {
    return null;
  }

  return (
    <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Toys from top brands</h2>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1.5}
          navigation={{
            nextEl: '.brand-next',
            prevEl: '.brand-prev',
          }}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1024: { slidesPerView: 5 },
          }}
          className="brands-swiper"
        >
          {brands.map(brand => (
            <SwiperSlide key={brand.id}>
              <a href={brand.link} className="block group p-4 hover:bg-gray-50 rounded-xl transition-all">
                <img 
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-20 object-contain mx-auto group-hover:scale-105 transition-transform"
                  onError={(e) => { e.target.src = '/api/placeholder-image.jpg'; }}
                />
                <p className="text-center text-sm font-semibold text-gray-900 mt-2 group-hover:text-blue-600">
                  {brand.name}
                </p>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="brand-prev absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-10 w-8 h-8 bg-white/80 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all">
          ‹
        </button>
        <button className="brand-next absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-10 w-8 h-8 bg-white/80 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all">
          ›
        </button>
      </div>
    </section>
  );
};

export default TopBrands;

