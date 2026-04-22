import React, { useState, useEffect } from 'react';
import API from '../api/axios.js';
import LimitedAccessoriesGrid from '../components/LimitedAccessoriesGrid';
// import SectionTitle from '../../components/SectionTitle';
// import HeroSlider from '../../components/HeroSlider';
import Footer from '../components/Footer';

const LimitedAccessoriesDeals = () => {
  const [limitedDeals, setLimitedDeals] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [allAccessories, setAllAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch limited deals - chargers, screenguards using exact MongoDB $or query
        const dealsRes = await API.get('/products', {
          params: {
            phoneAccessories: true,
            limit: 24,
            sort: 'price-asc'
          }
        });
        
        // Fetch bestsellers
        const bestsellerRes = await API.get('/products', {
          params: {
            phoneAccessories: true,
            sort: 'stars-desc',
            limit: 12
          }
        });
        
        // Fetch all accessories for secondary grid
        const allRes = await API.get('/products', { 
          params: { phoneAccessories: true, limit: 20 } 
        });
        
        setLimitedDeals(dealsRes.data.products || []);
        setBestsellers(bestsellerRes.data.products || bestsellerRes.data || []);
        setAllAccessories(allRes.data.products || []);
      } catch (err) {
        console.error('Failed to fetch accessories deals:', err);
        setError('Failed to load deals. Please try again.');
        // Fallback empty arrays
        setLimitedDeals([]);
        setBestsellers([]);
        setAllAccessories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading phone accessories (chargers, screenguards, headphones, holders, cleaners)...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        <div className="text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-screen-2xl mx-auto px-4 py-8">
        {/* Limited Time Deals */}
        {limitedDeals.length > 0 && (
          <LimitedAccessoriesGrid 
            products={limitedDeals} 
            title="🔥 Phone Accessories Deals - Chargers, Screen Guards (MongoDB Query)"
          />
        )}

        {/* Bestsellers */}
        {bestsellers.length > 0 && (
          <LimitedAccessoriesGrid 
            products={bestsellers} 
            title="⭐ Bestselling Phone Accessories"
          />
        )}

        {/* More Accessories */}
        {allAccessories.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Phone Holders, Cleaners & More</h2>
                <p className="text-sm text-gray-500 mt-1">Headphones, earphones, cleaning kits</p>
              </div>
            </div>
            <LimitedAccessoriesGrid 
              products={allAccessories.slice(0, 18)} 
              title="Phone Essentials (Exact Query Match)"
            />
          </section>
        )}

        {limitedDeals.length === 0 && bestsellers.length === 0 && (
          <div className="text-center py-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Phone Accessories Right Now</h2>
            <p className="text-xl text-gray-600 mb-8">chargers, screenguards, headphones, holders, cleaners loading...</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LimitedAccessoriesDeals;

