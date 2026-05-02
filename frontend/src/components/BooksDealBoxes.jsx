import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../api/booksApi';

const BooksDealBoxes = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        // Fetch books with deals (discounted products)
        const data = await fetchBooks({ deals: 'true', limit: 5, sort: 'rating' });
        setDeals(data.products || []);
      } catch (err) {
        console.error('Error fetching deals:', err);
        // Fallback to empty array - will show nothing if API fails
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  // Deal box configurations matching the static design
  const dealConfig = [
    { title: 'Up to 50% Off', subtitle: 'Fiction Books', color: 'from-orange-400 to-red-500', category: 'Books - Romance' },
    { title: 'Exam Prep', subtitle: 'Top Sellers', color: 'from-blue-400 to-blue-600', category: 'Books - Exam' },
    { title: 'School Books', subtitle: 'All Classes', color: 'from-green-400 to-green-600', category: 'Books - General' },
    { title: 'Comic Books', subtitle: 'Marvel & DC', color: 'from-purple-400 to-purple-600', category: 'Books - Children' },
    { title: 'Kids Books', subtitle: 'Age 3-12', color: 'from-pink-400 to-pink-600', category: 'Books - Children' },
  ];

  const getDealBook = (index) => {
    // Cycle through available deals
    return deals[index % deals.length];
  };

  if (loading) {
    return (
      <div className="bg-gray-100 mx-4 mt-4 rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Great Deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm h-48 animate-pulse">
              <div className="h-24 bg-gray-200"></div>
              <div className="p-3">
                <div className="w-20 h-28 mx-auto bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If no deals from API, don't render anything
  if (deals.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-100 mx-4 mt-4 rounded-lg p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Great Deals</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dealConfig.map((config, index) => {
          const book = getDealBook(index);
          return (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
            >
              {/* Gradient Background */}
              <div className={`h-24 bg-gradient-to-br ${config.color} flex items-center justify-center p-3`}>
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg">{config.title}</h3>
                  <p className="text-white/80 text-sm">{config.subtitle}</p>
                </div>
              </div>
              
              {/* Book Image */}
              <div className="p-3 bg-white">
                <div className="flex justify-center">
                  <img
                    src={book?.image || '/api/placeholder-image.jpg'}
                    alt={config.title}
                    className="w-20 h-28 object-cover rounded shadow-md"
                    onError={(e) => {
                      e.target.src = '/api/placeholder-image.jpg';
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BooksDealBoxes;
