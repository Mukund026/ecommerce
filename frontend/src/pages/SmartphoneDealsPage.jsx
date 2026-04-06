import React from 'react';
import SmartphoneHeroCarousel from '../components/SmartphoneHeroCarousel';
import SmartphoneMVPs from '../components/SmartphoneMVPs';
import FairPlayDeals from '../components/FairPlayDeals';
import AccessoriesDealsRow from '../components/AccessoriesDealsRow';
import SuperOverDeals from '../components/SuperOverDeals';
import CuratedStores from '../components/CuratedStores';
import FavouriteBrands from '../components/FavouriteBrands';
import AccessoriesGrid from '../components/AccessoriesGrid';
import BuyingGuide from '../components/BuyingGuide';
import Footer from '../components/Footer';

const SmartphoneDealsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-screen-2xl mx-auto px-2 md:px-4 py-4">
        {/* 1. Hero Banner Carousel */}
        <SmartphoneHeroCarousel />

        {/* 2. SMARTPHONES MVPs Section */}
        <SmartphoneMVPs />

        {/* 3. FAIR PLAY DEALS Section */}
        <FairPlayDeals />

        {/* 4. Limited Accessories Deals Row */}
        <AccessoriesDealsRow />

        {/* 5. SUPER OVER DEALS Banner */}
        <SuperOverDeals />

        {/* 6. Discover Curated Smartphone Stores */}
        <CuratedStores />

        {/* 7. Shop by Your Favourite Brands */}
        <FavouriteBrands />

        {/* 8. Accessories Deals Grid */}
        <AccessoriesGrid />

        {/* 9. Buying Guide / Information Section */}
        <BuyingGuide />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SmartphoneDealsPage;

