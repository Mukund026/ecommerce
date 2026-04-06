import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const BooksHeroBanner = () => {
  const heroBooks = [
    {
      id: 1,
      title: 'Harry Potter Complete Set',
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=200&h=280&fit=crop',
    },
    {
      id: 2,
      title: 'The Alchemist',
      price: 299,
      originalPrice: 599,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop',
    },
    {
      id: 3,
      title: 'Atomic Habits',
      price: 449,
      originalPrice: 899,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=280&fit=crop',
    },
    {
      id: 4,
      title: 'Rich Dad Poor Dad',
      price: 399,
      originalPrice: 799,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=280&fit=crop',
    },
  ];

  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-red-600 mx-4 mt-4 rounded-lg overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Bazaar II
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-yellow-300 mb-6">
              Up to 50% Off
            </p>
            <p className="text-white/90 text-lg max-w-lg">
              Explore millions of books across all genres. 
              Great deals on bestsellers, new releases, and exclusive editions.
            </p>
            <button className="mt-6 bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Shop Now
            </button>
          </div>

          {/* Book Cards */}
          <div className="flex gap-4 flex-wrap justify-center">
            {heroBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-xl p-3 transform hover:scale-105 transition-transform cursor-pointer"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-32 h-44 object-cover rounded mx-auto mb-2"
                />
                <p className="text-xs text-gray-600 truncate text-center mb-1">{book.title}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-orange-600">₹{book.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{book.originalPrice}</span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-green-600 font-medium">{book.discount}% off</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default BooksHeroBanner;

