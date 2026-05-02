import React, { useState, useEffect } from 'react';
import { fetchBookCategories } from '../api/booksApi';

const BooksCategoryScroll = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchBookCategories();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Keep fallback static categories
        setCategories([
          { name: 'Bestseller', label: 'Bestseller', icon: '⭐' },
          { name: 'New releases', label: 'New releases', icon: '🚀' },
          { name: 'Deals', label: 'Deals', icon: '🏷️' },
          { name: 'Hindi books', label: 'Hindi books', icon: '📚' },
          { name: 'Kids books', label: 'Kids books', icon: '👶' },
          { name: 'Comics', label: 'Comics', icon: '🎨' },
          { name: 'Exam prep', label: 'Exam prep', icon: '📝' },
          { name: 'Literature', label: 'Literature', icon: '📖' },
          { name: 'Self help', label: 'Self help', icon: '💪' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Fallback icons for categories
  const getCategoryIcon = (label) => {
    const icons = {
      'Children': '👶',
      'Exam': '📝',
      'General': '📚',
      'History': '🏛️',
      'Romance': '💕',
      'Science': '🔬',
      'Bestseller': '⭐',
      'New releases': '🚀',
      'Deals': '🏷️',
      'Hindi': '📕',
      'Kids': '👶',
      'Comics': '🎨',
      'Literature': '📖',
      'Self help': '💪',
    };
    return icons[label] || '📖';
  };

  if (loading) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex items-center gap-6 min-w-max">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max">
          {categories.map((category, index) => (
            <button
              key={category.name || index}
              className="flex flex-col items-center gap-2 group cursor-pointer"
              onClick={() => onCategorySelect && onCategorySelect(category.name)}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl group-hover:from-orange-100 group-hover:to-orange-200 transition-colors">
                {getCategoryIcon(category.label || category.name)}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 whitespace-nowrap">
                {category.label || category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksCategoryScroll;
