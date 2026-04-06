import React from 'react';
import { offerCards } from '../data/amazonFashion';

const OfferStrip = () => {
  const scrollLeft = () => {
    const container = document.getElementById('offer-strip');
    container.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById('offer-strip');
    container.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <div className="relative mb-8">
      <div className="flex items-center gap-4 bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 whitespace-nowrap flex-shrink-0">Popular offers</h3>
        <div id="offer-strip" className="flex-1 overflow-hidden">
          <div className="flex gap-4 scrollbar-hide">
            {offerCards.map((offer, index) => (
              <div key={index} className="group bg-white rounded-lg shadow-sm p-4 w-64 flex-shrink-0 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{offer.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-orange-600">
                      {offer.title}
                    </h4>
                    <p className="text-xs text-orange-600 font-medium">{offer.bank}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={scrollLeft} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg flex-shrink-0">
          ←
        </button>
        <button onClick={scrollRight} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg flex-shrink-0">
          →
        </button>
      </div>
    </div>
  );
};

export default OfferStrip;
