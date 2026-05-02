import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = ({ title = 'Toy Vehicles | Remote Control Jeep | Children Toys', bgClass = 'bg-gradient-to-r from-yellow-400 to-orange-400', ctaText = 'Shop Now' }) => {
  const navigate = useNavigate();
  return (
    <section className={`relative overflow-hidden rounded-xl shadow-2xl mb-12 h-64 md:h-80 lg:h-96 ${bgClass}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-300 to-pink-400 opacity-90"></div>
      
      <div className="absolute top-10 left-10 w-24 h-24 bg-white/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-8 py-12 lg:py-16 text-center lg:text-left">
        <div className="lg:w-1/2 space-y-4 lg:space-y-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg leading-tight">
            {title.split(' | ')[0]}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-semibold drop-shadow-md">
            {title.split(' | ').slice(1).join(' | ')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={() => navigate('/toys/remote-cars')} className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 hover:bg-orange-50">
              {ctaText} →
            </button>
            <button className="border-2 border-white text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-white hover:text-orange-500 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 mt-4 lg:mt-0 h-full flex items-center justify-center overflow-hidden">
          <img 
            src="https://m.media-amazon.com/images/I/71OIquAx6ML._AC_UL320_.jpg" 
            alt="Toy Vehicles"
className="h-full w-full object-contain rounded-2xl border-2 border-orange-300/50 drop-shadow-2xl animate-pulse hover:scale-105 transition-transform"
          />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-pulse {
            animation: float 3s ease-in-out infinite;
          }
        `
      }} />
    </section>
  );
};

export default HeroBanner;
