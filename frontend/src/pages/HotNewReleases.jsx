import React, { useState } from 'react';
import { hotNewReleasesCategories } from '../data/hotNewReleases';
import SubNavigation from '../components/SubNavigation';
import DepartmentSidebar from '../components/DepartmentSidebar';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';

const HotNewReleases = () => {
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4">
        <SubNavigation />

        {/* Page Header */}
        <div className="py-5 sm:py-8 mb-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Amazon Hot New Releases
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600">
              Our bestselling new and future releases. Updated frequently.
            </p>
          </div>
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden mb-6 p-4 bg-white rounded-lg shadow-sm">
          <button 
            onClick={() => setShowSidebarMobile(!showSidebarMobile)}
            className="w-full flex items-center justify-between text-left font-semibold text-lg"
          >
            Any Department
            <i className={`fas fa-chevron-down w-5 h-5 transition-transform duration-200 ${showSidebarMobile ? 'rotate-180' : ''}`}></i>
          </button>
        </div>

        {/* Main Layout */}
<div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-8 xl:grid-cols-[280px_1fr] xl:gap-10">
          {/* Sidebar */}
          <DepartmentSidebar />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="space-y-16 lg:space-y-20">
              {hotNewReleasesCategories.map((category, index) => (
                <CategorySection key={index} category={category} />
              ))}
            </div>

            {/* About Section */}
            <section className="mt-24 p-8 bg-white rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Hot New Releases</h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                These frequently updated lists contain bestselling items. To qualify, items must have sold more than 
                25 units in a week and have at least 15 unique customers who bought the item. All items are available 
                for purchase and delivery within India.
              </p>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotNewReleases;
