import React, { useState } from 'react';
import { toyFilterSections } from '../data/toys';

const ToysSidebar = ({ filters, setFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    ageRange: true,
    brands: true,
    price: false,
    reviews: false,
    discount: false,
    availability: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 py-3">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-50 rounded"
      >
        <span className="font-bold text-sm text-gray-800">{title}</span>
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

      {/* Category */}
      <FilterSection title="Category" sectionKey="category">
        {toyFilterSections.category.map(item => (
          <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.category?.includes(item.id) || false}
              onChange={() => handleFilterChange('category', item.id)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{item.label}</span>
            <span className="text-xs text-gray-500 ml-auto">({item.count?.toLocaleString()})</span>
          </label>
        ))}
      </FilterSection>

      {/* Age Range */}
      <FilterSection title="Age Range" sectionKey="ageRange">
        {toyFilterSections.ageRange.map(item => (
          <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.ageRange?.includes(item.id) || false}
              onChange={() => handleFilterChange('ageRange', item.id)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{item.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand" sectionKey="brands">
        {toyFilterSections.brands.map(item => (
          <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.brands?.includes(item.id) || false}
              onChange={() => handleFilterChange('brands', item.id)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{item.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price" sectionKey="price">
        {toyFilterSections.price.map(item => (
          <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="price"
              checked={filters.price === item.id}
              onChange={() => setFilters(prev => ({ ...prev, price: item.id }))}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{item.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Customer Reviews */}
      <FilterSection title="Customer Reviews" sectionKey="reviews">
        {toyFilterSections.reviews.map(item => (
          <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
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
                  className={`w-3.5 h-3.5 ${i < item.id ? 'text-orange-400 fill-current' : 'text-gray-300'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500">& Up</span>
            </div>
          </label>
        ))}
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount" sectionKey="discount">
        {toyFilterSections.discount.map(item => (
          <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.discount?.includes(item.id) || false}
              onChange={() => handleFilterChange('discount', item.id)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{item.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" sectionKey="availability">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.outOfStock || false}
            onChange={() => setFilters(prev => ({ ...prev, outOfStock: !prev.outOfStock }))}
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">Include Out of Stock</span>
        </label>
      </FilterSection>
    </div>
  );
};

export default ToysSidebar;

