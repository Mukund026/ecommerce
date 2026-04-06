import React, { useState } from 'react';
import FashionCategoryNav from '../components/FashionCategoryNav';
import SignInPromo from '../components/SignInPromo';
import OfferStrip from '../components/OfferStrip';
import HeroCarousel from '../components/HeroCarousel';
import PremiumEditGrid from '../components/PremiumEditGrid';
import BrandShowcaseRow from '../components/BrandShowcaseRow';
import BrandDealsGrid from '../components/BrandDealsGrid';
import FiltersSidebar from '../components/FiltersSidebar';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const AmazonFashion = () => {
  const [filters, setFilters] = useState({});
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1440px] mx-auto">
        {/* Fashion Category Navigation */}
        <FashionCategoryNav />

        {/* Page Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Sign In Promo */}
          <SignInPromo />

          {/* Offer Strip */}
          <OfferStrip />

          {/* Hero Carousel */}
          <HeroCarousel />

          {/* Premium Edit */}
          <PremiumEditGrid />

          {/* Brand Showcase */}
          <BrandShowcaseRow />

          {/* Top Brands Deals */}
          <BrandDealsGrid />

          {/* Product Listing */}
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8 mb-16">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden mb-6 p-4 bg-white border rounded-xl shadow-sm">
              <button 
                onClick={() => setShowSidebarMobile(!showSidebarMobile)}
                className="w-full flex items-center justify-between font-semibold text-gray-900"
              >
                <span>Filters ({Object.keys(filters).length})</span>
                <svg className={`w-5 h-5 transition-transform ${showSidebarMobile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Sidebar */}
            <div className={`lg:block ${showSidebarMobile ? 'block absolute z-50 top-0 left-0 right-0 bg-white shadow-2xl p-6 max-h-screen overflow-y-auto' : 'hidden lg:flex-shrink-0'}`}>
              <FiltersSidebar />
            </div>

            {/* Products */}
            <main>
              <div className="mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Fashion</h1>
                  <p className="text-xl text-gray-600 mt-1">125,000+ results</p>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span>Sort by:</span>
                  <select className="border border-gray-300 rounded-lg px-4 py-2 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Customer Reviews</option>
                  </select>
                </div>
              </div>

              {/* Featured Product Grids */}
              <ProductGrid title="Featured Fashion" />
              <ProductGrid title="Today's Deals" cols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5" />
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AmazonFashion;
