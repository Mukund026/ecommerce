import React from 'react';
import { genres } from '../data/books';

const genreToCategoryMap = {
  romance: 'Books - Romance',
  history: 'Books - History',
  science: 'Books - Science',
  children: 'Books - Children',
  exam: 'Books - Exam',
};

const BooksGenreGrid = ({ onCategorySelect }) => {
  const handleGenreClick = (genreId) => {
    const category = genreToCategoryMap[genreId] || 'Books - General';
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Genre</h2>

      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className="group flex flex-col items-center text-center cursor-pointer bg-transparent border-none p-0"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-100 group-hover:border-orange-300 transition-colors">
              <img
                src={genre.image}
                alt={genre.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
              {genre.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BooksGenreGrid;
