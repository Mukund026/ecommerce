import React, { useState } from 'react';
import ToysSidebar from '../components/ToysSidebar';
import CategoryIcons from '../components/CategoryIcons';
import HeroBanner from '../components/HeroBanner';
import FeaturedToys from '../components/FeaturedToys';
import ProductGrid from '../components/ProductGrid';
import TopBrands from '../components/TopBrands';
import BookBazaarBanner from '../components/BookBazaarBanner';
import Footer from '../components/Footer';
import { toyProducts } from '../data/toys';
import ToyRooms from '../components/ToyRooms';

const Toys = () => {
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
            <svg className={`w-5 h-5 transition-transform ${showSidebarMobile ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-6 py-6 lg:py-8">
          {/* Sidebar - Mobile Fullscreen & Desktop Fixed */}
          <div className={`lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto order-2 lg:order-1 ${showSidebarMobile ? 'block absolute z-50 top-0 left-0 right-0 bottom-0 bg-white shadow-2xl p-4 overflow-y-auto' : 'hidden lg:block lg:w-full lg:flex-shrink-0'}`}>
            <ToysSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <main className="order-1 lg:order-2 flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 pb-4 border-b">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Toys & Games</h1>
                <p className="text-lg text-gray-600">125,000+ results</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 w-full lg:w-auto justify-between lg:justify-end">
                <div className="flex items-center gap-2 text-sm font-medium hidden sm:flex lg:flex">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full whitespace-nowrap">Sort by:</span>
                  <select className="text-sm font-medium border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <CategoryIcons />
            <HeroBanner />
            <FeaturedToys />
            <ToyRooms />
            
            {/* Customer Most Loved */}
            <section className="mb-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-6 sm:p-12 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center drop-shadow-2xl">Customer most loved</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({length: 8}, (_, i) => (
                  <div key={i} className="group text-center hover:scale-105 transition-all duration-200">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:bg-white/50">
                      <span className="text-2xl sm:text-3xl">❤️</span>
                    </div>
                    <p className="font-semibold text-white/95 text-sm">Soft Toy {i+1}</p>
                  </div>
                ))}
              </div>
            </section>

            <TopBrands />

            {/* What's Big in Playtime */}
            <section className="mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 text-white rounded-2xl p-6 sm:p-12 shadow-2xl overflow-hidden">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center drop-shadow-lg relative z-10">What's Big in Playtime</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {['👩‍🍳', '🩺', '🏠', '🚜', '🔬', '🎨', '🎸', '⚽'].map((emoji, i) => (
                  <div key={i} className="group w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white/40 hover:bg-white rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6">
                    <span className="text-2xl">{emoji}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Outdoor Toys */}
            <section className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">Outdoor Toys</h2>
              <ProductGrid products={toyProducts.slice(0,8)} cols={4} />
            </section>

            {/* Amazon Brand */}
            <section className="mb-12 bg-gradient-to-r from-indigo-900 to-gray-900 text-white rounded-2xl p-6 sm:p-12 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center drop-shadow-lg">Amazon Brand Toys</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({length: 8}, (_, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 hover:scale-105 transition-all duration-200">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mx-auto mb-4 shadow-lg flex items-center justify-center">
                      <span className="text-2xl">🧱</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">Basics Toy {i+1}</h3>
                    <div className="text-2xl font-bold">₹{299 + i * 50}</div>
                    <p className="text-sm opacity-80 mt-1">Prime</p>
                  </div>
                ))}
              </div>
            </section>

            <BookBazaarBanner />

            {/* Main Product Listings */}
            <ProductGrid title="Today's Top Toy Deals" />
            <ProductGrid title="Learning & Educational Toys" />
            <ProductGrid title="Building Blocks & Construction" />
            <ProductGrid title="Dolls & Accessories" className="lg:grid-cols-5" />

            {/* Pagination */}
            <section className="mb-16 bg-white rounded-xl shadow-sm p-6 sm:p-8 border">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-sm flex-shrink-0 w-12 h-12">1</button>
                <button className="px-3 py-2 border border-gray-300 bg-orange-500 text-white rounded-md font-medium text-sm flex-shrink-0 w-12 h-12">2</button>
                <span className="px-3 py-2 text-gray-500 text-sm flex-shrink-0">...</span>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-sm flex-shrink-0 w-12 h-12">10</button>
                <button className="ml-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm whitespace-nowrap">
                  See more deals →
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Toys;

