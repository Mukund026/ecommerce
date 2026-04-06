import React from 'react';

const BooksPrimeOffer = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 mx-4 mt-4 rounded-lg overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-2xl font-bold text-white">Prime</span>
              <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-0.5 rounded">EXCLUSIVE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Prime Exclusive Offers
            </h2>
            <p className="text-blue-200 text-lg">
              Up To 40% Off
            </p>
            <button className="mt-4 bg-yellow-400 text-blue-900 px-6 py-2.5 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
              Explore Prime
            </button>
          </div>

          {/* Right Images */}
          <div className="flex gap-4 justify-center">
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop"
              alt="Prime Book 1"
              className="w-24 h-36 object-cover rounded shadow-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=150&h=200&fit=crop"
              alt="Prime Book 2"
              className="w-24 h-36 object-cover rounded shadow-xl transform translate-y-4"
            />
            <img
              src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=150&h=200&fit=crop"
              alt="Prime Book 3"
              className="w-24 h-36 object-cover rounded shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPrimeOffer;

