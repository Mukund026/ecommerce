import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const LimitedAccessoriesGrid = ({ products = [], title = "Limited Accessories Deals - Bestsellers" }) => {
  if (!products.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No limited deals available right now</p>
          <Link to="/smartphones/accessories-deals" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-all">
            View All Accessories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {title}
        </h2>
        <Link 
          to="/smartphones/accessories-deals" 
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          See All Deals →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {products.map((product, index) => {
          const price = product.price || 299;
          const originalPrice = price * 1.5;
          const discount = Math.round((originalPrice - price) / originalPrice * 100);
          const item = {
            ...product,
            price,
            originalPrice,
            discount,
            rating: product.stars || product.rating || 4.0,
            reviews: product.reviews || 0,
            id: product._id || `product-${index}`,
            name: product.title || product.name || 'Phone Accessory',
            image: `/accessoriesimages/${product.name?.toLowerCase().includes('charger') ? 'charger.jpeg' : product.name?.toLowerCase().includes('guard') || product.name?.toLowerCase().includes('screen') ? 'screenguard.jpeg' : 'mobile pouch.jpeg'}`,
            isBestSeller: product.isBestSeller || index % 3 === 0
          };
          return (
            <div key={item.id} className="group">
              <ProductCard product={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LimitedAccessoriesGrid;
