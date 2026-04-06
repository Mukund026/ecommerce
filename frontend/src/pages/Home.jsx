import React, { useState } from 'react';
import DeliveryBanner from '../components/DeliveryBanner';
import HeroCarousel from '../components/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid';
import GroceryProductGrid from '../components/GroceryProductGrid';
import Footer from '../components/Footer';
import FreshModal from '../components/FreshModal';

const Home = () => {
  const [showFreshModal, setShowFreshModal] = useState(false);

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
            <DeliveryBanner />
          </div>
        </div>

        {/* Category Grid */}
        <div className="mb-6">
          <CategoryGrid />
        </div>

        {/* Product Grid */}
        <div className="mb-6">
          <GroceryProductGrid />
        </div>

        {/* Additional Product Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Fresh Fruits Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Fresh Fruits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&h=150&fit=crop" 
                  alt="Apples" 
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium">Fresh Apples</p>
                <p className="text-sm text-orange-600 font-bold">₹199/kg</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop" 
                  alt="Bananas" 
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium">Organic Bananas</p>
                <p className="text-sm text-orange-600 font-bold">₹49/pack</p>
              </div>
            </div>
          </div>

          {/* Dairy & Milk Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Dairy & Milk</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop" 
                  alt="Milk" 
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium">Amul Gold Milk</p>
                <p className="text-sm text-orange-600 font-bold">₹68/L</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=150&h=150&fit=crop" 
                  alt="Curd" 
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium">Fresh Curd</p>
                <p className="text-sm text-orange-600 font-bold">₹45/pack</p>
              </div>
            </div>
          </div>
        </div>

        {/* Snacks Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Snacks & Beverages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border rounded hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=150&h=150&fit=crop" 
                alt="Chips" 
                className="w-full h-20 object-contain mb-2"
              />
              <p className="text-sm font-medium">Lays Chips</p>
              <p className="text-sm text-orange-600 font-bold">₹39</p>
            </div>
            <div className="text-center p-3 border rounded hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=150&h=150&fit=crop" 
                alt="Juice" 
                className="w-full h-20 object-contain mb-2"
              />
              <p className="text-sm font-medium">Orange Juice</p>
              <p className="text-sm text-orange-600 font-bold">₹95</p>
            </div>
            <div className="text-center p-3 border rounded hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop" 
                alt="Chocolate" 
                className="w-full h-20 object-contain mb-2"
              />
              <p className="text-sm font-medium">Dark Chocolate</p>
              <p className="text-sm text-orange-600 font-bold">₹150</p>
            </div>
            <div className="text-center p-3 border rounded hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=150&fit=crop" 
                alt="Coffee" 
                className="w-full h-20 object-contain mb-2"
              />
              <p className="text-sm font-medium">Instant Coffee</p>
              <p className="text-sm text-orange-600 font-bold">₹250</p>
            </div>
          </div>
        </div>

        {/* Household Essentials */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Household Essentials</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded">
              <img 
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=80&h=80&fit=crop" 
                alt="Detergent" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <p className="text-sm font-medium">Detergent</p>
                <p className="text-sm text-orange-600 font-bold">From ₹199</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded">
              <img 
                src="https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=80&h=80&fit=crop" 
                alt="Sanitizer" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <p className="text-sm font-medium">Sanitizer</p>
                <p className="text-sm text-orange-600 font-bold">From ₹49</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded">
              <img 
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=80&h=80&fit=crop" 
                alt="Tissues" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <p className="text-sm font-medium">Tissues</p>
                <p className="text-sm text-orange-600 font-bold">From ₹99</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded">
              <img 
                src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=80&h=80&fit=crop" 
                alt="Cleaner" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <p className="text-sm font-medium">Floor Cleaner</p>
                <p className="text-sm text-orange-600 font-bold">From ₹149</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

