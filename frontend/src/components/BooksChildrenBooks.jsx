import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchBooks } from '../api/booksApi';

const BooksChildrenBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChildrenBooks = async () => {
      try {
        const data = await fetchBooks({
          category: 'Books - Children',
          limit: 10,
          sort: 'featured'
        });

        console.log("FRONTEND DATA:", data); // 👈 ADD THIS

        setBooks(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadChildrenBooks();
  }, []);

  if (loading) {
    return (
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Children's Books - <span className="text-orange-600">Up to 40% off</span>
          </h2>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (!loading && books.length === 0) {
    return <p className="p-4">No books found</p>;
  }

  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Children's Books - <span className="text-orange-600">Up to 40% off</span>
        </h2>
        <a href="#" className="text-sm text-blue-600 hover:underline font-medium">See all</a>
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
          className="children-books-swiper"
        >
          {books?.map((book) => (
            <SwiperSlide key={book.id}>
              <div className="bg-white border border-gray-100 rounded p-3 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative mb-3">
                  <img
                    src={book.image}
                    onError={(e) => {
                      e.target.src = '/api/placeholder-image.jpg';
                    }}
                    alt={book.title}
                    className="w-full h-36 object-cover rounded"
                  />
                  <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {book.discount}% off
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{book.title}</h3>
                <p className="text-xs text-gray-500 mb-2">by {book.author || 'Unknown'}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-600">Rs.{book.price}</span>
                  <span className="text-sm text-gray-400 line-through">Rs.{book.originalPrice}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BooksChildrenBooks;
