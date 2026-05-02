import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BooksProductCard = ({ book }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    navigate(`/books/${book.id}`);
  };

  // Use placeholder if image is missing, empty, or failed to load
  const hasValidImage = book.image && book.image.trim() && book.image.startsWith('http');
  const imageSrc = !hasValidImage || imageError ? '/api/placeholder-image.jpg' : book.image;

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white border border-gray-200 rounded p-3 hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Book Image */}
      <div className="relative mb-3">
        <img
          src={imageSrc}
          alt={book.title}
          onError={() => setImageError(true)}
          className="w-full h-36 sm:h-44 md:h-48 object-contain rounded"
        />
        {/* Prime Badge */}
        {book.isPrime && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
              Prime
            </span>
          </div>
        )}
      </div>

      {/* Book Title */}
      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 h-10">
        {book.title}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(book.rating) ? 'text-orange-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-gray-500">({book.reviews?.toLocaleString()})</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl font-bold text-gray-900">₹{book.price}</span>
        <span className="text-sm text-gray-500 line-through">₹{book.originalPrice}</span>
      </div>

      {/* Discount */}
      <div className="mb-3">
        <span className="text-sm text-green-600 font-medium">
          {book.discount}% off
        </span>
      </div>

      {/* Delivery */}
      <p className="text-xs text-gray-500 mb-3">
        FREE delivery by Amazon
      </p>

      {/* Add to Cart Button */}
      <button 
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 rounded text-sm transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BooksProductCard;
