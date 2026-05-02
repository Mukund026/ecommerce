import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BooksSidebar from '../components/BooksSidebar';
import BooksCategoryScroll from '../components/BooksCategoryScroll';
import BooksProductGrid from '../components/BooksProductGrid';
import BooksProductCard from '../components/BooksProductCard';
import Footer from '../components/Footer';
import { fetchBooks } from '../api/booksApi';

// All book categories
const ALL_BOOK_CATEGORIES = [
  { name: 'Books - Children', label: 'Children' },
  { name: 'Books - Exam', label: 'Exam' },
  { name: 'Books - General', label: 'General' },
  { name: 'Books - History', label: 'History' },
  { name: 'Books - Romance', label: 'Romance' },
  { name: 'Books - Science', label: 'Science' },
];

// Helper to convert sidebar filters to API params
const convertFiltersToParams = (filters) => {
  const params = {};
  
  // Convert category filter
  if (filters.category && filters.category.length > 0) {
    params.category = filters.category.join(',');
  }
  
  // Rating filter
  if (filters.rating) {
    params.rating = filters.rating;
  }
  
  // Price filter
  if (filters.price) {
    const priceMap = {
      'Under 100': { maxPrice: 100 },
      '100-200': { minPrice: 100, maxPrice: 200 },
      '200-500': { minPrice: 200, maxPrice: 500 },
      '500-1000': { minPrice: 500, maxPrice: 1000 },
      'Above 1000': { minPrice: 1000 },
    };
    if (priceMap[filters.price]) {
      Object.assign(params, priceMap[filters.price]);
    }
  }
  
  // Discount filter
  if (filters.discount && filters.discount.length > 0) {
    const discountValues = filters.discount.map(d => {
      const match = d.match(/(\d+)%/);
      return match ? parseInt(match[1]) : 0;
    });
    if (discountValues.length > 0) {
      params.discount = Math.min(...discountValues);
    }
  }
  
  // Set deals=true if any discount filter selected
  if (filters.discount && filters.discount.length > 0) {
    params.deals = 'true';
  }
  
  return params;
};

// Single category section component
const BookCategorySection = ({ category, label, filters = {} }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const params = { 
          category: category, 
          limit: 8, 
          sort: 'featured',
          ...filters 
        };
        // Add filter params if they exist
        if (filters.rating) params.rating = filters.rating;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.discount) params.discount = filters.discount;
        if (filters.deals) params.deals = 'true';
        
        const data = await fetchBooks(params);
        setBooks(data.products || []);
      } catch (err) {
        console.error(`Error fetching ${category} books:`, err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [category, filters.rating, filters.minPrice, filters.maxPrice, filters.discount, filters.deals]);

  return (
    <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{label} Books</h2>
        <Link to={`/books?category=${encodeURIComponent(category)}`} className="text-sm text-orange-600 hover:text-orange-700 font-medium">
          See all →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-40 rounded-lg mb-2"></div>
              <div className="bg-gray-200 h-4 rounded mb-1"></div>
              <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4">
          {books.map((book) => (
            <BooksProductCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 py-8 text-center">No books found in this category</p>
      )}
    </div>
  );
};

// Offer banner component
const OfferContainer = ({ title, description, code, discount }) => (
  <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm p-4">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <div className="text-center">
        <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg">
          <span className="text-2xl font-bold">{discount}% OFF</span>
        </div>
        {code && (
          <p className="text-xs text-gray-500 mt-2">Use code: <span className="font-bold text-gray-700">{code}</span></p>
        )}
      </div>
    </div>
  </div>
);

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

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // Check if we should show all categories or single category view
  const showAllCategories = !selectedCategory;
  
  // Convert filters to API params
  const apiFilters = convertFiltersToParams(filters);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Category Navigation */}
      <BooksCategoryScroll onCategorySelect={handleCategorySelect} />

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 py-4">
        <div className="flex flex-col xl:flex-row gap-4">
          {/* Left Sidebar - Filters */}
          <div className="hidden xl:block w-64 flex-shrink-0">
            <BooksSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {showAllCategories ? (
              // Show all categories with separate containers and offers
              <>
                <BookCategorySection category={ALL_BOOK_CATEGORIES[0].name} label={ALL_BOOK_CATEGORIES[0].label} filters={apiFilters} />
                <BookCategorySection category={ALL_BOOK_CATEGORIES[1].name} label={ALL_BOOK_CATEGORIES[1].label} filters={apiFilters} />
                
                {/* Offer Container */}
                <OfferContainer 
                  title="Exam Preparation Sale" 
                  description="Get ready for your exams with top-rated study materials at flat 25% off!"
                  code="EXAM25"
                  discount={25}
                />
                
                <BookCategorySection category={ALL_BOOK_CATEGORIES[2].name} label={ALL_BOOK_CATEGORIES[2].label} filters={apiFilters} />
                <BookCategorySection category={ALL_BOOK_CATEGORIES[3].name} label={ALL_BOOK_CATEGORIES[3].label} filters={apiFilters} />
                
                {/* Offer Container */}
                <OfferContainer 
                  title="History & Romance Combo" 
                  description="Buy History or Romance books together and get 30% off on your second book!"
                  code="READ30"
                  discount={30}
                />
                
                <BookCategorySection category={ALL_BOOK_CATEGORIES[4].name} label={ALL_BOOK_CATEGORIES[4].label} filters={apiFilters} />
                <BookCategorySection category={ALL_BOOK_CATEGORIES[5].name} label={ALL_BOOK_CATEGORIES[5].label} filters={apiFilters} />
              </>
            ) : (
              // Single category view (original behavior)
              <BooksProductGrid category={selectedCategory} />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BooksBazaar;
