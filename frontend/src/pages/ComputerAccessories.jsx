import React, { useState } from 'react';
import { useComputers } from '../hooks/useComputers';
import ComputerProductCard from '../components/ComputerProductCard';
import ComputerSidebar from '../components/ComputerSidebar';
import Footer from '../components/Footer';

const categories = [
  { name: 'Computer Accessories', limit: 12 },
  { name: 'Computer Audio  Video Accessories', limit: 12 },
  { name: 'Computer Cable Adapters', limit: 12 },
  { name: 'Computer Components', limit: 12 },
  { name: 'Computer Hard Drive Accessories', limit: 12 },
  { name: 'Computer Monitor Accessories', limit: 12 },
  { name: 'Computer Monitors', limit: 12 },
  { name: 'Computer Security Cables', limit: 12 },
  { name: 'Computer Uninterrupted Power Supply', limit: 12 },
];

const CategorySection = ({ categoryName, limit }) => {
  const { products, loading, error, refetch } = useComputers({ category: categoryName, limit });

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{categoryName}</h2>
        {products.length > 0 && (
          <span className="text-sm text-gray-500">{products.length} results</span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-2 text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">{error}</p>
          <button
            onClick={refetch}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-sm py-4">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ComputerProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

const ComputerAccessories = () => {
  const [filters, setFilters] = useState({
    category: [],
    brands: [],
    deals: [],
    price: null,
    rating: null,
    outOfStock: false,
  });
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const {
    products: mainProducts,
    loading: mainLoading,
    error: mainError,
    refetch: mainRefetch,
    totalCount,
    totalPages,
    currentPage,
  } = useComputers({ limit: 40 });

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
            <ComputerSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <main className="order-1 lg:order-2 flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 pb-4 border-b">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  Computers & Accessories
                </h1>
                <p className="text-lg text-gray-600">
                  {mainLoading ? 'Loading...' : `${(totalCount || 0).toLocaleString()}+ results`}
                </p>
              </div>
            </div>

            {/* 9 Dedicated Category Sections */}
            {categories.map((cat) => (
              <CategorySection
                key={cat.name}
                categoryName={cat.name}
                limit={cat.limit}
              />
            ))}

            {/* All Computer Accessories Grid */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">All Computer Accessories</h2>
              {mainLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-20">
                  {Array(20)
                    .fill()
                    .map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 h-64 rounded-lg"></div>
                      </div>
                    ))}
                </div>
              ) : mainError ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-4">{mainError}</p>
                  <button
                    onClick={mainRefetch}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {mainProducts.map((product) => (
                      <ComputerProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  <div className="mt-12 text-center">
                    <button
                      onClick={mainRefetch}
                      disabled={mainLoading}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium px-12 py-3 rounded-full transition-all shadow-sm text-sm"
                    >
                      {mainLoading ? 'Loading...' : 'Load More Products'}
                    </button>
                    {mainError && (
                      <p className="text-red-500 mt-2 text-sm">{mainError}</p>
                    )}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-8 text-sm text-gray-500 text-center">
                      Page {currentPage} of {totalPages} | {totalCount || 0} total products
                    </div>
                  )}
                </>
              )}
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComputerAccessories;

