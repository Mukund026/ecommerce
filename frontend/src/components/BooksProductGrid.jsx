import React, { useState, useEffect } from 'react';
import BooksProductCard from './BooksProductCard';
import { fetchBooks } from '../api/booksApi';

const BooksProductGrid = ({ category }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadBooks = async (pageNum = 1) => {
    try {
      setLoading(true);
      const params = { page: pageNum, limit: 12, sort: 'featured' };
      if (category) params.category = category;
      
      const data = await fetchBooks(params);
      if (pageNum === 1) {
        setBooks(data.products);
      } else {
        setBooks(prev => [...prev, ...data.products]);
      }
      setTotalCount(data.totalCount);
      setError(null);
    } catch (err) {
      setError('Failed to load books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadBooks(1);
  }, [category]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadBooks(nextPage);
  };

  if (loading && books.length === 0) {
    return (
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading books...</p>
      </div>
    );
  }

  if (error && books.length === 0) {
    return (
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => loadBooks(1)}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {category ? category.replace('Books - ', '') : 'Books'}
        </h2>
        <span className="text-sm text-gray-500">
          {books.length > 0 ? `1-${books.length} of over ${totalCount.toLocaleString()} results` : 'No results found'} 
          <span className="text-gray-900 font-medium"> {category || 'Books'}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {books.map((book) => (
          <BooksProductCard key={book.id} book={book} />
        ))}
      </div>

      {books.length < totalCount && (
        <div className="mt-6 text-center">
          <button 
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-2.5 rounded-full transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More Books'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BooksProductGrid;
