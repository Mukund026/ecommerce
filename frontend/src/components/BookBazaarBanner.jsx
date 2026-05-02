import React from 'react';
import { Link } from 'react-router-dom';

const BookBazaarBanner = () => {
  return (
    <section className="mb-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-12 text-center shadow-2xl relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxMCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-20"></div>
      
      {/* Stacked Books Graphic */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left: Text & CTA */}
        <div className="lg:w-1/2">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-2xl font-black">Book Bazaar</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight drop-shadow-2xl">
            Up to <span className="text-yellow-300 text-5xl md:text-6xl lg:text-7xl">50%</span> Off
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-95 drop-shadow-lg">
            Explore thousands of books at unbeatable prices
          </p>
          <Link
            to="/books"
            className="inline-block bg-white text-red-600 font-bold px-12 py-4 rounded-full text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 hover:bg-red-50"
          >
            Shop Books →
          </Link>
        </div>
        
        {/* Right: Books Stack */}
        <div className="lg:w-1/2 relative">
          <div className="flex gap-3 justify-center lg:justify-end">
            {/* Book 1 */}
            <div className="w-20 h-32 bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg shadow-xl transform rotate-6 hover:rotate-0 transition-transform"></div>
            {/* Book 2 */}
            <div className="w-24 h-36 bg-gradient-to-b from-green-200 to-green-400 rounded-lg shadow-xl transform -rotate-3 hover:rotate-0 z-10 transition-transform"></div>
            {/* Book 3 */}
            <div className="w-20 h-32 bg-gradient-to-b from-purple-200 to-purple-400 rounded-lg shadow-xl transform rotate-2 hover:rotate-0 transition-transform"></div>
            {/* Book 4 */}
            <div className="w-16 h-28 bg-gradient-to-b from-orange-200 to-orange-400 rounded-lg shadow-xl transform -rotate-8 hover:rotate-0 transition-transform"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookBazaarBanner;

