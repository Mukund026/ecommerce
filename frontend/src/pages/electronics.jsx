import React, { useState } from 'react';
import PromoBanner from '../components/PromoBanner';
import ElectronicsSidebar from '../components/ElectronicsSidebar';
import ProductGrid from '../components/ProductGrid';
import SmartwatchDealSection from '../components/SmartwatchDealSection';
import Footer from '../components/Footer';
import { productSections, electronicsProducts } from '../data/amazonElectronics';

const Electronics = () => {
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Content Area */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Hero Banner */}
          <PromoBanner type="hero" />

          {/* Credit Card Offer */}
          <PromoBanner type="credit" />

          {/* Smartwatch Deals */}
          <SmartwatchDealSection />

          {/* Main Listing Layout */}
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8 mb-24">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden mb-8 p-4 bg-white border rounded-xl shadow-sm">
              <button 
                onClick={() => setShowSidebarMobile(!showSidebarMobile)}
                className="w-full flex items-center justify-between font-semibold text-gray-900 text-lg"
              >
                <span>Filters</span>
                <svg className={`w-6 h-6 transition-transform ${showSidebarMobile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Sidebar */}
            <div className={`lg:block ${showSidebarMobile ? 'fixed z-50 inset-0 bg-black/50' : ''}`}>
              <div className={`lg:static lg:translate-x-0 ${showSidebarMobile ? 'fixed inset-0 transform translate-x-full lg:translate-x-0 bg-white h-screen overflow-y-auto shadow-2xl lg:shadow-none lg:w-64 lg:h-auto' : 'hidden lg:flex-shrink-0'}`}>
                <ElectronicsSidebar />
              </div>
              {showSidebarMobile && (
                <div 
                  className="lg:hidden fixed inset-0 z-40 bg-black/50"
                  onClick={() => setShowSidebarMobile(false)}
                />
              )}
            </div>

            {/* Products */}
            <main className="space-y-16">
              {/* Product Sections */}
              {productSections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <span className="w-2 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                    {section.title}
                  </h2>
                  <ProductGrid 
                    cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
                    title={null}
                    loading={loading}
                  />
                </section>
              ))}
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Electronics;
