import React from 'react';

const BooksFeaturedBanner = () => {
  return (
    <div className="bg-gradient-to-r from-red-700 to-red-600 mx-4 mt-4 rounded-lg overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-center md:text-left max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              A powerful contemporary novel that explores struggles, sacrifices, and resilience of India's youth
            </h2>
            <p className="text-white/80 text-lg">
              Discover the most talked-about book of the season. A story that touches every heart.
            </p>
            <button className="mt-6 bg-white text-red-700 px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Buy Now
            </button>
          </div>

          {/* Featured Book Image */}
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
              alt="Featured Book"
              className="w-48 md:w-56 h-auto object-cover rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksFeaturedBanner;

