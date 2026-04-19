import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useSmartphones } from '../hooks/useSmartphones';
import SmartphoneHeroCarousel from '../components/SmartphoneHeroCarousel';
import SmartphoneMVPs from '../components/SmartphoneMVPs';
import FairPlayDeals from '../components/FairPlayDeals';
import AccessoriesDealsRow from '../components/AccessoriesDealsRow';
import SuperOverDeals from '../components/SuperOverDeals';
import CuratedStores from '../components/CuratedStores';
import BuyingGuide from '../components/BuyingGuide';
import API from '../api/axios.js';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

const SmartphoneDealsPage = () => {
  const [searchParams] = useSearchParams();
  const { page: pageParam } = useParams();
  let page = parseInt(pageParam || searchParams.get('page')) || 1;
  if (pageParam === 'more') page = 2;
  const limit = 12;
  
  const { smartphones, brands: apiBrands, loading, error, totalPages } = useSmartphones({ limit, page, includeBrands: true });

  // Single source of truth for accessories
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const res = await API.get('/accessories', {
          params: { page: 1, limit: 20 }
        });
        setAccessories(res.data.products || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccessories();
  }, []);

  // Dynamic grouping from smartphones if no apiBrands (like hot deals)
  const groupBrands = (products) => {
    const grouped = {};
    const targetBrands = {
      'Samsung': /samsung|samsung/i,
      'Apple': /iphone|apple/i,
      'realme': /realme/i
    };

    products.forEach((product, index) => {
      const name = product.name || '';
      let brandKey = '';
      for (const [brand, regex] of Object.entries(targetBrands)) {
        if (regex.test(name)) {
          brandKey = brand;
          break;
        }
      }
      if (!brandKey) return; // Skip non-matching
      if (!grouped[brandKey]) {
        grouped[brandKey] = [];
      }
      if (grouped[brandKey].length < 4) {
        const { price, originalPrice } = { price: product.price || 0, originalPrice: product.originalPrice || 0 };
        grouped[brandKey].push({
          id: product.id || `p${index}`,
          name: product.name,
          price,
          originalPrice,
          discount: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
          image: product.image || product.imgUrl || '',
          rating: product.stars || 4.3,
        });
      }
    });

    return Object.entries(grouped).map(([name, products], index) => ({
      id: index + 1,
      name,
      products
    })).slice(0, 5);
  };

  const productsWithDiscount = useMemo(() => smartphones.map(p => ({
    ...p,
    discount: p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0,
    originalPrice: p.originalPrice,
    brand: (p.name || '').split(' ')[0] || 'Brand',
    rating: p.stars || 4.5
  })), [smartphones]);

  const dynamicBrands = groupBrands(productsWithDiscount);
  const brands = apiBrands && apiBrands.length > 0 ? apiBrands : dynamicBrands;

  const mvpProducts = useMemo(() => productsWithDiscount.slice(0,6), [productsWithDiscount]);
  const fairPlayProducts = useMemo(() => productsWithDiscount.filter(p => p.price < 25000).slice(0,4), [productsWithDiscount]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading smartphones...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-screen-2xl mx-auto px-2 md:px-4 py-4">
        <SmartphoneHeroCarousel />
        <SmartphoneMVPs products={mvpProducts} />
        <FairPlayDeals products={fairPlayProducts} />
        <AccessoriesDealsRow
          title="Limited Accessories Deals"
          products={accessories.slice(0, 6)}
        />
        <SuperOverDeals products={productsWithDiscount.slice(0,8)} />
        <CuratedStores brands={brands} /> 
        <AccessoriesDealsRow
          title="Accessories Deals"
          products={accessories.slice(0, 12)}
        />
        <BuyingGuide />
        {/* Pagination removed as requested */}
      </main>
      <Footer />
    </div>
  );
};

export default SmartphoneDealsPage;

