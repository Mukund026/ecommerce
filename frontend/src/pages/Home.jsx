import React, { useState, useEffect } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid';
import GroceryProductCard from '../components/GroceryProductCard';
import Footer from '../components/Footer';
import FreshModal from '../components/FreshModal';

const Home = () => {
  const [showFreshModal, setShowFreshModal] = useState(false);
  const [bestsellers, setBestsellers] = useState([]);
  const [freshFruits, setFreshFruits] = useState([]);
  const [snacksBeverages, setSnacksBeverages] = useState([]);
  const [houseEssentials, setHouseEssentials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = 'http://localhost:5000/api/products';
        
        const [bestsellerRes, fruitsRes, snacksRes, houseRes] = await Promise.all([
          fetch(`${baseUrl}/bestsellers`).catch(() => ({ json: () => ({ data: [] }) })),
          fetch(`${baseUrl}/fresh-fruits`).catch(() => ({ json: () => ({ data: [] }) })),
          fetch(`${baseUrl}/snacks-beverages`).catch(() => ({ json: () => ({ data: [] }) })),
          fetch(`${baseUrl}/house-essentials`).catch(() => ({ json: () => ({ data: [] }) }))
        ]);

        const [bestsellerData, fruitsData, snacksData, houseData] = await Promise.all([
          bestsellerRes.json(),
          fruitsRes.json(),
          snacksRes.json(),
          houseRes.json()
        ]);

        setBestsellers(bestsellerData?.data || []);
        setFreshFruits(fruitsData?.data || []);
        setSnacksBeverages(snacksData?.data || []);
        setHouseEssentials(houseData?.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFreshClick = () => {
    setShowFreshModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FreshModal isOpen={showFreshModal} onClose={() => setShowFreshModal(false)} />
      
      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 py-6">
        {/* Hero Section with Delivery Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <HeroCarousel />
          </div>
          <div className="lg:col-span-1">
          </div>
        </div>

        {/* Category Grid */}
        <div className="mb-6">
          <CategoryGrid />
        </div>

        {/* Product Grid */}
        <div className="mb-6">
        </div>

{/* Best Sellers Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Bestsellers</h3>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : bestsellers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestsellers.slice(0, 4).map((product) => (
                <GroceryProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No bestseller products available</p>
          )}
        </div>

        {/* Fresh Fruits Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Fresh Fruits & Vegetables</h3>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : freshFruits.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {freshFruits.slice(0, 4).map((product) => (
                <GroceryProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No fresh fruits available</p>
          )}
        </div>

{/* Snacks & Beverages Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Snacks & Beverages</h3>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : snacksBeverages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {snacksBeverages.slice(0, 4).map((product) => (
                <GroceryProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No snacks and beverages available</p>
          )}
        </div>

{/* Household Essentials */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Household Essentials</h3>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : houseEssentials.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {houseEssentials.slice(0, 4).map((product) => (
                <GroceryProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No household essentials available</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
