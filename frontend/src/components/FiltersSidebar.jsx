import React, { useState } from 'react';

const FiltersSidebar = () => {
  const [expanded, setExpanded] = useState({
    department: true,
    price: true,
    brands: false,
    reviews: false,
    discount: false
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="lg:w-64 space-y-6 bg-white rounded-xl shadow-sm p-6 lg:p-8 border lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Filters</h2>
      <p className="text-sm text-gray-500 mb-8">125,000+ results</p>

      {/* Department */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('department')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4"
        >
          <span>Department</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.department ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`${expanded.department ? 'block' : 'hidden'}`}>
          <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
            <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
            <span>Women</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
            <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
            <span>Men</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
            <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
            <span>Kids</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
            <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
            <span>Bags</span>
          </label>
        </div>
      </div>

      {/* Price */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4"
        >
          <span>Price</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.price ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`${expanded.price ? 'block' : 'hidden'}`}>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="radio" name="price" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>Under ₹499</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="radio" name="price" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>₹499 - ₹999</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="radio" name="price" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>₹999 - ₹1999</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="radio" name="price" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>₹1999+</span>
            </label>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4"
        >
          <span>Brands</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.brands ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`${expanded.brands ? 'block' : 'hidden'}`}>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>Zivame</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>Allen Solly</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>Lakme</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>Liberty</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>Voylla</span>
            </label>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('reviews')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4"
        >
          <span>Customer Reviews</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.reviews ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`${expanded.reviews ? 'block' : 'hidden'}`}>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="radio" name="reviews" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>4 Stars & Up</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="radio" name="reviews" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>3 Stars & Up</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="radio" name="reviews" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>2 Stars & Up</span>
            </label>
          </div>
        </div>
      </div>

      {/* Discount */}
      <div className="pb-6">
        <button 
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4"
        >
          <span>Discount</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.discount ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`${expanded.discount ? 'block' : 'hidden'}`}>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>10% Off or more</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>25% Off or more</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span>50% Off or more</span>
            </label>
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg uppercase tracking-wide">
        Apply Filters
      </button>
    </aside>
  );
};

export default FiltersSidebar;
