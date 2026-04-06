import React, { useState } from 'react';
import { homeKitchenFilters } from '../data/homeKitchen';

const HomeKitchenSidebar = ({ filters, setFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    loveIndia: true,
    categories: true,
    ratings: false,
    price: false,
    discount: false,
    deals: false,
    availability: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 py-3 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-50 rounded text-left"
      >
        <span className="font-semibold text-sm text-gray-800">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections[sectionKey] ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expandedSections[sectionKey] && (
        <div className="px-3 py-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24 max-h-[calc(100vh-12rem)] overflow-y-auto">
      <h3 className="font-bold text-lg mb-6 text-gray-900 border-b pb-3">Filters</h3>

      {/* Love From India */}
      <FilterSection title="Love From India" sectionKey="loveIndia">
        {homeKitchenFilters.loveFromIndia.map(item => (
          <label key={item.id} className="flex items-center gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={filters.loveIndia?.includes(item.id) || false}
              onChange={() => handleCheckboxChange('loveIndia', item.id)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className="text-xs text-gray-500 ml-auto">({item.count})</span>
          </label>
        ))}
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Categories" sectionKey="categories">
        {homeKitchenFilters.categories.map(item => (
          <label key={item.id} className="flex items-center gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={filters.categories?.includes(item.id) || false}
              onChange={() => handleCheckboxChange('categories', item.id)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className="text-xs text-gray-500 ml-auto">({item.count})</span>
          </label>
        ))}
      </FilterSection>

      {/* Customer Ratings */}
      <FilterSection title="Customer Ratings" sectionKey="ratings">
        {homeKitchenFilters.ratings.map(item => (
          <label key={item.id} className="flex items-center gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === item.id}
              onChange={() => setFilters(prev => ({ ...prev, rating: item.id }))}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < item.id ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm font-medium text-gray-900">& Up</span>
            </div>
          </label>
        ))}
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price" sectionKey="price">
        {homeKitchenFilters.prices.map(item => (
          <label key={item.id} className="flex items-center gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded">
            <input
              type="radio"
              name="price"
              checked={filters.price === item.id}
              onChange={() => setFilters(prev => ({ ...prev, price: item.id }))}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">{item.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount" sectionKey="discount">
        {homeKitchenFilters.discounts.map(item => (
          <label key={item.id} className="flex items-center gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={filters.discount?.includes(item.id) || false}
              onChange={() => handleCheckboxChange('discount', item.id)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">{item.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Deals */}
      <FilterSection title="Deals" sectionKey="deals">
        {homeKitchenFilters.deals.map(item => (
          <label key={item.id} className="flex items-center gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={filters.deals?.includes(item.id) || false}
              onChange={() => handleCheckboxChange('deals', item.id)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">{item.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" sectionKey="availability">
        <label className="flex items-center gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded">
          <input
            type="checkbox"
            checked={filters.outOfStock || false}
            onChange={() => setFilters(prev => ({ ...prev, outOfStock: !prev.outOfStock }))}
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">Include Out of Stock</span>
        </label>
      </FilterSection>

      <div className="mt-6 pt-4 border-t">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Apply Filters
        </button>
        <button className="w-full mt-2 text-orange-600 hover:text-orange-700 font-medium text-sm py-2 transition-colors">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default HomeKitchenSidebar;
