import React from 'react';
import { dealBoxes } from '../data/books';

const BooksDealBoxes = () => {
  return (
    <div className="bg-gray-100 mx-4 mt-4 rounded-lg p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Great Deals</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dealBoxes.map((deal, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
          >
            {/* Gradient Background */}
            <div className={`h-24 bg-gradient-to-br ${deal.color} flex items-center justify-center p-3`}>
              <div className="text-center">
                <h3 className="text-white font-bold text-lg">{deal.title}</h3>
                <p className="text-white/80 text-sm">{deal.subtitle}</p>
              </div>
            </div>
            
            {/* Book Image */}
            <div className="p-3 bg-white">
              <div className="flex justify-center">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-20 h-28 object-cover rounded shadow-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksDealBoxes;

