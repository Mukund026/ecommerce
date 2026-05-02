import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import ProductGrid from '../components/ProductGrid';
import ToysSidebar from '../components/ToysSidebar';
import Footer from '../components/Footer';
import { toyCategories, buildToysQueryParams } from '../data/toys';

const ToysCategory = () => {
  const { category: rawCategory } = useParams();
  const category = decodeURIComponent(rawCategory || '');
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState('featured');

  const [filters, setFilters] = useState({
    category: [],
    ageRange: [],
    brands: [],
    price: null,
    rating: null,
    discount: [],
    outOfStock: false,
  });
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const limit = 20;

  // Find category metadata from our toyCategories data
  const categoryMeta = toyCategories.find(
    (c) => c.slug === category
  );

  const categoryName = categoryMeta?.name || category;

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build base params from category metadata
        const baseParams = { page, limit, sort };
        if (categoryMeta) {
          if (categoryMeta.apiParams.search) {
            baseParams.search = categoryMeta.apiParams.search;
          }
          if (categoryMeta.apiParams.category) {
            baseParams.category = categoryMeta.apiParams.category;
          }
        } else {
          // Fallback: treat the slug as a search term
          baseParams.search = category.replace(/-/g, ' ');
        }

        // Merge sidebar filters
        const params = buildToysQueryParams(filters, baseParams);

        const res = await axios.get('/toys', {
          params,
          timeout: 15000,
        });

        setProducts(res.data.products || []);
        setTotal(res.data.totalCount || 0);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error('Error fetching category toys:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, page, sort, categoryMeta, filters]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  if (!categoryMeta && !loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h2>
          <p className="text-gray-600 mb-6">The category "{category}" does not exist.</p>
          <Link
            to="/toys"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Toys & Games
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden mb-4 p-4 bg-white border rounded-lg shadow-sm">
          <button
            onClick={() => setShowSidebarMobile(!showSidebarMobile)}
            className="w-full flex items-center justify-between text-left font-semibold"
          >
            <span>Filters</span>
            <svg
              className={`w-5 h-5 transition-transform ${showSidebarMobile ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-6 py-6 lg:py-8">
          {/* Sidebar */}
          <div
            className={`lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto order-2 lg:order-1 ${
              showSidebarMobile
                ? 'block absolute z-50 top-0 left-0 right-0 bottom-0 bg-white shadow-2xl p-4 overflow-y-auto'
                : 'hidden lg:block lg:w-full lg:flex-shrink-0'
            }`}
          >
            <ToysSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <main className="order-1 lg:order-2 flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 pb-4 border-b">
              <div className="mb-4 lg:mb-0">
                <Link
                  to="/toys"
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold mb-2"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Toys & Games
                </Link>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {categoryName}
                </h1>
                <p className="text-lg text-gray-600">
                  {loading ? 'Loading...' : `${total.toLocaleString()}+ results`}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 w-full lg:w-auto justify-between lg:justify-end">
                <div className="flex items-center gap-2 text-sm font-medium hidden sm:flex lg:flex">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full whitespace-nowrap">Sort by:</span>
                  <select
                    value={sort}
                    onChange={handleSortChange}
                    className="text-sm font-medium border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                {error}
                <button
                  onClick={() => window.location.reload()}
                  className="ml-4 underline font-semibold hover:text-red-900"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid
              products={products}
              cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              loading={loading}
            />

            {/* Empty State */}
            {!loading && products.length === 0 && !error && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found in {categoryName}.</p>
                <button
                  onClick={() => navigate('/toys')}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  Browse All Toys
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <section className="mb-16 bg-white rounded-xl shadow-sm p-6 sm:p-8 border mt-8">
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  {Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-2 border rounded-md font-medium text-sm flex-shrink-0 w-12 h-12 transition-colors ${
                        pageNum === page
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  {totalPages > 10 && <span className="px-3 py-2 text-gray-500 text-sm flex-shrink-0">...</span>}
                  <button
                    disabled={page * limit >= total}
                    onClick={() => setPage((p) => p + 1)}
                    className="ml-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm whitespace-nowrap"
                  >
                    See more deals →
                  </button>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ToysCategory;
