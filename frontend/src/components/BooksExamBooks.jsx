import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../api/booksApi';

const BooksExamBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExamBooks = async () => {
      try {
        const data = await fetchBooks({ category: 'Books - Exam', limit: 8, sort: 'featured' });
        setBooks(data.products || []);
      } catch (err) {
        console.error('Error fetching exam books:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExamBooks();
  }, []);

  if (loading) {
    return (
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Essential Govt Exam Books</h2>
            <p className="text-orange-600 font-semibold">Up to 40% off</p>
          </div>
        </div>
        <div className="h-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return null;
  }

  // Group books into categories for display
  const categories = [
    { name: 'UPSC', filter: 'upsc' },
    { name: 'SSC', filter: 'ssc' },
    { name: 'Banking', filter: 'bank' },
    { name: 'TGT/PGT', filter: 'tgt' },
  ];

  const getCategoryBooks = (filter) => {
    return books.filter(b => b.title.toLowerCase().includes(filter)).slice(0, 2);
  };

  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Essential Govt Exam Books</h2>
          <p className="text-orange-600 font-semibold">Up to 40% off</p>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:underline font-medium">See all</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const catBooks = getCategoryBooks(category.filter);
          const displayBook = catBooks[0] || books[index];
          return (
            <div
              key={index}
              className="border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer text-center"
            >
              <div className="w-full h-28 rounded-lg overflow-hidden mb-3">
                <img
                  src={displayBook?.image || '/api/placeholder-image.jpg'}
                  alt={category.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{catBooks.length}+ books</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BooksExamBooks;
