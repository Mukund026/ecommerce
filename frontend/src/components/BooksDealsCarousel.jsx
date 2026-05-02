import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchBooks } from '../api/booksApi';

const BooksDealsCarousel = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        // Fetch books with deals - high discount items
        const data = await fetchBooks({ 
          discount: '25', 
          limit: 10, 
          sort: 'rating' 
        });
        setBooks(data.products || []);
      } catch (err) {
        console.error('Error fetching deal books:', err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  if (loading) {
    return (
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Steal Deals – Biggest Savings of the Season</h2>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-48 flex-shrink-0 bg-gray-100 rounded p-3 h-72 animate-pulse">
              <div className="h-40 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Steal Deals – Biggest Savings of the Season</h2>
        <a href="#" className="text-sm text-blue-600 hover:underline font-medium">See all deals</a>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={5}
          slidesPerGroup={5}
          breakpoints={{
            320: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 16,
            },
          }}
          className="deals-swiper"
        >
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <div className="bg-white border border-gray-100 rounded p-3 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative mb-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded"
                    onError={(e) => {
                      e.target.src = '/api/placeholder-image.jpg';
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {book.discount}% off
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{book.title}</h3>
                <p className="text-xs text-gray-500 mb-2">by {book.author || 'Unknown'}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(book.rating || 0) ? 'text-orange-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({book.reviews?.toLocaleString()})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-600">₹{book.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{book.originalPrice}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BooksDealsCarousel;
