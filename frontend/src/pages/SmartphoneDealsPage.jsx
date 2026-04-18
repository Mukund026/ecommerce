import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSmartphones } from '../hooks/useSmartphones';
import SmartphoneHeroCarousel from '../components/SmartphoneHeroCarousel';
import SmartphoneMVPs from '../components/SmartphoneMVPs';
import FairPlayDeals from '../components/FairPlayDeals';
import AccessoriesDealsRow from '../components/AccessoriesDealsRow';
import SuperOverDeals from '../components/SuperOverDeals';
import CuratedStores from '../components/CuratedStores';
import FavouriteBrands from '../components/FavouriteBrands';
import AccessoriesGrid from '../components/AccessoriesGrid';
import BuyingGuide from '../components/BuyingGuide';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

const SmartphoneDealsPage = () => {
  const [searchParams] = useSearchParams();
  const { page: pageParam } = useParams();
  let page = parseInt(pageParam || searchParams.get('page')) || 1;
  if (pageParam === 'more') page = 2;
  const limit = 20;
  
  const { smartphones, loading, error, totalPages } = useSmartphones({ limit, page });
  console.log("SMARTPHONES:", smartphones);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading smartphones...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Error: {error}</div>;

  const productsWithDiscount = smartphones.map(p => ({
    ...p,
    discount: p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0,
    originalPrice: p.originalPrice,
    brand: (p.name || '').split(' ')[0] || 'Brand',
    rating: p.stars || 4.5
  }));

  const mvpProducts = productsWithDiscount.slice(0,6);
  const fairPlayProducts = productsWithDiscount.filter(p => p.price < 25000).slice(0,4);
  const accessoryProducts = productsWithDiscount.filter(p => p.price < 5000).slice(0,12);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-screen-2xl mx-auto px-2 md:px-4 py-4">
        <SmartphoneHeroCarousel />
        <SmartphoneMVPs products={mvpProducts} />
        <FairPlayDeals products={fairPlayProducts} />
        <AccessoriesDealsRow products={accessoryProducts.slice(0,6)} />
        <SuperOverDeals />
        <CuratedStores />
        <FavouriteBrands products={productsWithDiscount} />
        <AccessoriesGrid products={accessoryProducts} />
        <BuyingGuide />
        <Pagination currentPage={page} totalPages={totalPages || 1} basePath="/smartphones" />
      </main>
      <Footer />
    </div>
  );
};

export default SmartphoneDealsPage;
