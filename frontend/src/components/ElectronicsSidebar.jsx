import React, { useState } from 'react';
import { electronicsCategories, brands } from '../data/amazonElectronics';

const ElectronicsSidebar = () => {
  const [expanded, setExpanded] = useState({
    category: true,
    brands: false,
    reviews: false,
    price: true,
    condition: false,
    discount: false,
    availability: false
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-full lg:w-64 bg-white rounded-xl shadow-sm p-6 lg:p-8 border lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>
        <p className="text-sm text-gray-600 mb-8">25,000+ results</p>
      </div>

      {/* Category */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4 pb-2"
        >
          <span>Category</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.category ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.category && (
          <div className="space-y-2">
            {electronicsCategories.map((category, index) => (
              <label key={index} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="truncate">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4 pb-2"
        >
          <span>Brands</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.brands ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.brands && (
          <div className="space-y-2">
            {brands.map((brand, index) => (
              <label key={index} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="truncate">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Customer Reviews */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('reviews')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4 pb-2"
        >
          <span>Customer Reviews</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.reviews ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.reviews && (
          <div className="space-y-2">
            {[4, 3, 2].map((stars) => (
              <label key={stars} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>& Up</span>
                <input type="radio" name="reviews" className="ml-auto w-4 h-4 rounded border-gray-300 text-blue-600" />
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4 pb-2"
        >
          <span>Price</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.price ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.price && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
              <input type="radio" name="price" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span>₹1,000–₹5,000</span>
            </label>
            <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
              <input type="radio" name="price" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span>₹5,000–₹10,000</span>
            </label>
            <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
              <input type="radio" name="price" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span>₹10,000–₹20,000</span>
            </label>
            <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
              <input type="radio" name="price" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span>Over ₹20,000</span>
            </label>
          </div>
        )}
      </div>

      {/* Condition */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('condition')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4 pb-2"
        >
          <span>Condition</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.condition ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.condition && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
              <input type="radio" name="condition" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span>New</span>
            </label>
            <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
              <input type="radio" name="condition" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span>Renewed</span>
            </label>
          </div>
        )}
      </div>

      {/* Discount */}
      <div className="border-b pb-6">
        <button 
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4 pb-2"
        >
          <span>Discount</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.discount ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.discount && (
          <div className="space-y-2">
            {[10, 25, 50, 70].map((percent) => (
              <label key={percent} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                <span>{percent}% Off</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <button 
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 mb-4 pb-2"
        >
          <span>Availability</span>
          <svg className={`w-5 h-5 transition-transform ${expanded.availability ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.availability && (
          <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
            <span>Include Out of Stock</span>
          </label>
        )}
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mt-8">
        Apply All Filters
      </button>
    </aside>
  );
};

export default ElectronicsSidebar;
