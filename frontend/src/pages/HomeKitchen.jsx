import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { categoryMap } from '../data/categoryMap';
import Navbar from '../components/Navbar';
import HomeKitchenSidebar from '../components/HomeKitchenSidebar';
import HomeKitchenProductCard from '../components/HomeKitchenProductCard';
import CategoryIcons from '../components/CategoryIcons';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const HomeKitchen = () => {
  const [filters, setFilters] = useState({
    loveIndia: [],
    categories: [],
    rating: null,
    price: { min: 0, max: 10000 },
    discount: [],
    deals: [],
    outOfStock: false,
  });
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  // DYNAMIC Backend-driven products ✅
  const mainProducts = useProducts({ 
    category: 'Home & Kitchen',
    limit: 80,
    sort: 'relevance'
  });

  const filteredProducts = useProducts({
    category: 'Home & Kitchen',
    ...(filters.categories.length && { subcategory: filters.categories[0] }),
    ...(filters.price.min && { minPrice: filters.price.min }),
    ...(filters.price.max && { maxPrice: filters.price.max }),
    limit: 40
  });

  const dealsProducts = useProducts({
    category: 'Home & Kitchen',
    sort: 'price:asc',
    limit: 12
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar will render sticky header + secondary nav */}
      
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden mb-4 p-4 bg-white border rounded-lg shadow-sm">
          <button 
            onClick={() => setShowSidebarMobile(!showSidebarMobile)}
            className="w-full flex items-center justify-between text-left font-semibold"
          >
            <span>All Filters</span>
            <svg className={`w-5 h-5 transition-transform ${showSidebarMobile ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-6 py-6 lg:py-8">
          {/* Sidebar */}
          <div className={`lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto order-2 lg:order-1 ${
            showSidebarMobile 
              ? 'block absolute z-50 top-0 left-0 right-0 bottom-0 bg-white shadow-2xl p-4 overflow-y-auto' 
              : 'hidden lg:block lg:w-full lg:flex-shrink-0'
          }`}>
            <HomeKitchenSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <main className="order-1 lg:order-2 flex-1 min-w-0">
            {/* Category Heading */}
            <section className="mb-8 pb-6 border-b">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Buy products across Home, Kitchen, Garden, Furniture, Sports and more online at Amazon India
                  </h1>
                  <p className="text-xl text-gray-600">
                    {mainProducts.total || 0}+ results | Page {mainProducts.currentPage} of {mainProducts.totalPages}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4 lg:mt-0">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">Sort by:</span>
                  <select 
                    onChange={(e) => mainProducts.refetch({ sort: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Featured</option>
                    <option value="price:asc">Price: Low to High</option>
                    <option value="price:desc">Price: High to Low</option>
                    <option value="stars:desc">Avg. Customer Review</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </section>

            {/* SECTION 2: Category Icon Row */}
            <section className="mb-12">
              <CategoryIcons />
            </section>

            {/* SECTION 3: Hero Banner Slider */}
            <section className="mb-12">
              <HeroBanner 
                title="Home & kitchen finds | Min. 60% off | Amazon Basics promotion"
                bgClass="bg-gradient-to-r from-orange-500 to-red-500 text-white"
              />
            </section>

            {/* Dynamic Product Sections */}
            <div className="space-y-12 mb-16">
              {/* Featured Deals */}
              <section className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Blockbuster Deals ({dealsProducts.products.length} items)
                </h2>
                {dealsProducts.loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
                    {Array(8).fill().map((_, i) => (
                      <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>
                    ))}
                  </div>
                ) : dealsProducts.products.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {dealsProducts.products.map(product => (
                      <Link key={product.id} to={`/product/${product.slug}`}>
                        <HomeKitchenProductCard product={product} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No deals available right now</p>
                    <button onClick={dealsProducts.refetch} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-medium">
                      Refresh Deals
                    </button>
                  </div>
                )}
              </section>

              {/* Main Products */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Home & Kitchen</h2>
                {mainProducts.loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-20">
                    {Array(16).fill().map((_, i) => (
                      <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-xl"></div>
                    ))}
                  </div>
                ) : mainProducts.error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 mb-4">{mainProducts.error}</p>
                    <button onClick={mainProducts.refetch} className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium">
                      Try Again
                    </button>
                  </div>
                ) : (
                  <ProductGrid products={mainProducts.products} cols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
                )}
              </section>
            </div>

            {/* Dynamic Pagination */}
            {mainProducts.totalPages > 1 && (
              <section className="mb-16 bg-white rounded-xl shadow-sm p-8 border">
                <div className="flex flex-wrap items-center gap-3 justify-center">
                  <button 
                    onClick={mainProducts.fetchPrev}
                    disabled={!mainProducts.hasPrev}
                    className="w-10 h-10 border rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center disabled:opacity-50"
                  >
                    ←
                  </button>
                  <span className="font-medium">
                    Page {mainProducts.currentPage} of {mainProducts.totalPages}
                  </span>
                  <button 
                    onClick={mainProducts.fetchNext}
                    disabled={!mainProducts.hasNext}
                    className="w-10 h-10 border rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center disabled:opacity-50"
                  >
                    →
                  </button>
                  <button 
                    onClick={mainProducts.refetch}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-sm"
                  >
                    Refresh ({mainProducts.total} results)
                  </button>
                </div>
              </section>
            )}
            {mainProducts.error && (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{mainProducts.error}</p>
                <button 
                  onClick={mainProducts.refetch}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Try Again
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeKitchen;
