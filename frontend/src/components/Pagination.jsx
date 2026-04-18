import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Pagination = ({ currentPage = 1, totalPages = 25, basePath = '' }) => {
  const [searchParams] = useSearchParams();
  
  // Always render buttons for UX

  const getPageLink = (pageNum) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNum);
    return `${basePath}?${params.toString()}`;
  };

  const pageNumbers = [];
  const maxVisible = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-2 md:flex-row md:space-y-0 md:space-x-2">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      <Link
        to={getPageLink(currentPage - 1)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Previous
      </Link>

      {startPage > 1 && (
        <>
          <Link to={getPageLink(1)} className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">1</Link>
          <span className="px-2 text-sm text-gray-500">...</span>
        </>
      )}

      {pageNumbers.map((page) => (
        <Link
          key={page}
          to={getPageLink(page)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          <span className="px-2 text-sm text-gray-500">...</span>
          <Link to={getPageLink(totalPages)} className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">{totalPages}</Link>
        </>
      )}

      <Link
        to={getPageLink(currentPage + 1)}
        className={`px-4 py-2 rounded-md text-sm font-semibold font-medium transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;

