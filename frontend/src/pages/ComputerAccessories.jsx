import React, { useState, useEffect } from 'react';
import { useComputers } from '../hooks/useComputers';
import { categoryMap } from '../data/categoryMap';
import ComputerSidebar from '../components/ComputerSidebar';
import ComputerProductCard from '../components/ComputerProductCard';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ComputerAccessories = () => {
  // Dynamic data from backend ✅
  const mainProducts = useComputers({ 
    limit: 100 
  });
  
  const dealsProducts = useComputers({ 
    limit: 16 
  });
  
  const audioProductsHook = useComputers({ 
    limit: 20 
  });
  
  const discountProductsHook = useComputers({
    limit: 16
  });
  
  const [filters, setFilters] = useState({
    category: [],
    brands: [],
    rating: null,
    price: { min: 0, max: 50000 },
    deals: [],
    outOfStock: false,
  });

  // Update main query when filters change
  const filteredProducts = useComputers({
    ...(filters.price.max && { maxPrice: filters.price.max }),
    page: 1,
    limit: 40
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <ComputerSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Page Title Bar */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">PC Accessories</h1>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-gray-600">Gaming Accessories</span>
              </div>
            </div>

            {/* Shop by Category Grid - DYNAMIC */}
<section className="mb-8">
  <h2 className="text-lg font-bold text-gray-900 mb-6">Shop by category ({mainProducts.totalCount || mainProducts.products.length} results)</h2>
              {mainProducts.loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  <span className="ml-2 text-gray-500">Loading categories...</span>
                </div>
              ) : mainProducts.error ? (
                <div className="text-center py-12 text-red-500">
                  {mainProducts.error}
                  <button onClick={mainProducts.refetch} className="ml-4 bg-orange-500 text-white px-4 py-1 rounded text-sm">
                    Retry
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mainProducts.products.slice(0, 8).map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="group">
                      <div className="bg-white rounded-lg shadow-sm p-3 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                        <img 
                          src={product.imgUrl || '/api/placeholder-image.jpg'} 
                          alt={product.name}
                          className="w-full h-24 object-cover rounded mb-2 group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.target.src = '/api/placeholder-image.jpg';
                          }}
                        />
                        <h3 className="text-sm font-medium text-gray-900 text-center truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 text-center">₹{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* New Launches - DYNAMIC */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                New launches | Gaming accessories ({mainProducts.products.length} found)
              </h2>
              {mainProducts.loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
                  {mainProducts.products.slice(0, 10).map(product => (
                    <ComputerProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>

            {/* Deals on Gaming Accessories - DYNAMIC */}
            <section className="mb-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-8">
              <h2 className="text-xl font-bold mb-6">
                Deals on gaming accessories ({dealsProducts.products.length} deals)
              </h2>
              {dealsProducts.loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : dealsProducts.error ? (
                <p className="text-orange-200">Loading deals...</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {dealsProducts.products.map(product => (
                    <ComputerProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>

            {/* Audio Products Row - DYNAMIC */}
            <section className="mb-8">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
                {audioProductsHook.products.slice(0, 10).map(product => (
                  <ComputerProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Up to 70% off - DYNAMIC */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Up to 70% off | Gaming Accessories ({discountProductsHook.products.length} items)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {discountProductsHook.products.map(product => (
                  <ComputerProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Product Grids - DYNAMIC Category Cards */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Featured products ({mainProducts.totalCount || 0} total)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mainProducts.products.slice(8, 16).map((product, index) => (
                <Link key={product.id || index} to={`/product/${product.id}`} className="group cursor-pointer">
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all p-4">
                      <img 
                        src={product.imgUrl || '/api/placeholder-image.jpg'} 
                        alt={product.name}
                        className="w-full h-24 object-cover rounded mb-2"
                        onError={(e) => e.target.src = '/api/placeholder-image.jpg'}
                      />
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-gray-500">₹{product.price} | {product.reviews} reviews</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Large Products */}
            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainProducts.products.slice(-3).map(product => (
                  <ComputerProductCard key={product.id} product={product} size="large" />
                ))}
              </div>
            </section>

            {/* More Product Grids - DYNAMIC */}
            {filteredProducts.products.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Filtered Results ({filteredProducts.products.length} items)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredProducts.products.map((product, index) => (
                    <Link key={product.id} to={`/product/${product.slug}`} className="group">
                      <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all p-4">
                        <img 
                          src={product.imgUrl} 
                          alt={product.name}
                          className="w-full h-24 object-cover rounded mb-2" 
                          onError={(e) => e.target.src = '/api/placeholder-image.jpg'}
                        />
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-gray-500">
                          ⭐ {product.stars?.toFixed(1)} ({product.reviews}) | ₹{product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Main Product Grid - DYNAMIC */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">All Computer Accessories</h2>
              {mainProducts.loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-20">
                  {Array(20).fill().map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-64 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mainProducts.products.slice(20).map(product => (
                    <ComputerProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
              <div className="mt-12 text-center">
                <button 
                  onClick={mainProducts.refetch}
                  disabled={mainProducts.loading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium px-12 py-3 rounded-full transition-all shadow-sm text-sm"
                >
                  {mainProducts.loading ? 'Loading...' : 'Load More Products'}
                </button>
                {mainProducts.error && (
                  <p className="text-red-500 mt-2 text-sm">{mainProducts.error}</p>
                )}
              </div>
              {mainProducts.totalPages > 1 && (
                <div className="mt-8 text-sm text-gray-500 text-center">
                  Page {mainProducts.currentPage} of {mainProducts.totalPages} | {mainProducts.total} total products
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComputerAccessories;
