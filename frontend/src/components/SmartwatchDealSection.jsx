import React from 'react';
import { smartwatchDeals } from '../data/amazonElectronics';

const SmartwatchDealSection = () => {
  return (
    <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 lg:px-8 rounded-3xl shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-4">
            Up to 80% off
          </h2>
          <p className="text-2xl lg:text-3xl font-bold text-gray-800">Deals on Smartwatches</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {smartwatchDeals.map((deal) => (
            <div key={deal.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-4 border hover:border-blue-200">
              <div className="relative h-80 lg:h-96 p-8 flex flex-col">
                <img 
                  src={deal.image}
                  alt={deal.title}
                  className="h-64 w-auto mx-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 right-6 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  80% OFF
                </div>
                <div className="mt-auto pt-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600">
                    {deal.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="text-3xl lg:text-4xl font-black text-gray-900">
                      {deal.price}
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      {deal.mrp}
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg uppercase tracking-wide">
                    Grab Deal Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-12 py-6 rounded-3xl text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
            View All Smartwatch Deals →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SmartwatchDealSection;
