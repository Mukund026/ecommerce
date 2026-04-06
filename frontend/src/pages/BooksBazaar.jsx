import React, { useState } from 'react';
import BooksSidebar from '../components/BooksSidebar';
import BooksCategoryScroll from '../components/BooksCategoryScroll';
import BooksHeroBanner from '../components/BooksHeroBanner';
import BooksDeliveryBanner from '../components/BooksDeliveryBanner';
import BooksAuthorSection from '../components/BooksAuthorSection';
import BooksFeaturedBanner from '../components/BooksFeaturedBanner';
import BooksDealsCarousel from '../components/BooksDealsCarousel';
import BooksDishaSale from '../components/BooksDishaSale';
import BooksHotPress from '../components/BooksHotPress';
import BooksGenreGrid from '../components/BooksGenreGrid';
import BooksExamBooks from '../components/BooksExamBooks';
import BooksDealBoxes from '../components/BooksDealBoxes';
import BooksPrimeOffer from '../components/BooksPrimeOffer';
import BooksChildrenBooks from '../components/BooksChildrenBooks';
import BooksUsualBooks from '../components/BooksUsualBooks';
import BooksPriceBuckets from '../components/BooksPriceBuckets';
import BooksProductGrid from '../components/BooksProductGrid';
import Footer from '../components/Footer';

const BooksBazaar = () => {
  const [filters, setFilters] = useState({
    category: [],
    author: [],
    language: [],
    rating: null,
    price: null,
    discount: [],
    format: [],
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Category Navigation */}
      <BooksCategoryScroll />

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 py-4">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>

        <div className="flex flex-col xl:flex-row gap-4">
          {/* Left Sidebar - Filters */}
          <div className="hidden xl:block w-64 flex-shrink-0">
            <BooksSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Hero Banner */}
            <BooksHeroBanner />

            {/* Delivery Banner */}
            <BooksDeliveryBanner />

            {/* Author of the Month */}
            <BooksAuthorSection />

            {/* Featured Book Banner */}
            <BooksFeaturedBanner />

            {/* Steal Deals Carousel */}
            <BooksDealsCarousel />

            {/* Disha Sale */}
            <BooksDishaSale />

            {/* Hot Off The Press */}
            <BooksHotPress />

            {/* Shop by Genre */}
            <BooksGenreGrid />

            {/* Essential Govt Exam Books */}
            <BooksExamBooks />

            {/* Deal Boxes */}
            <BooksDealBoxes />

            {/* Prime Offer */}
            <BooksPrimeOffer />

            {/* Children's Books */}
            <BooksChildrenBooks />

            {/* Usual Books Categories */}
            <BooksUsualBooks />

            {/* Price Buckets */}
            <BooksPriceBuckets />

            {/* Product Grid */}
            <BooksProductGrid />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BooksBazaar;

