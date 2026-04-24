import React from 'react';
import { useComputers } from '../hooks/useComputers';
import ComputerProductCard from '../components/ComputerProductCard';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ComputerAccessories = () => {
  // Dynamic data from backend - PC Accessories only (backend query: categoryName regex /computer/i)
  const mainProducts = useComputers({ limit: 100 });
  const dealsProducts = useComputers({ deals: 'true', limit: 16 });
  const audioProductsHook = useComputers({ limit: 20 });
  const discountProductsHook = useComputers({ deals: 'true', limit: 16 });

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
    <div className="min-h-screen bg-gray-100">
      <div className="w-full px-4 py-8">
        <div className="w-full">
          {/* Main Content Area */}
          <div className="w-full">
            {/* Page Title Bar */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PC Accessories</h1>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-gray-600">Gaming Accessories</span>
                </div>
              </div>
            </div>

            {/* Shop by Category Grid */}
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
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
                  {mainProducts.products.slice(0, 8).map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="group">
                      <div className="bg-white rounded shadow-sm p-1.5 hover:shadow-md transition-all hover:-translate-y-1">
                        <div className="relative h-60 w-full aspect-square mb-1 rounded">
                          <img 
                            src={product.image || product.imgUrl || '/api/placeholder-image.jpg'} 
                            alt={product.name}
                            className="w-full h-full object-contain rounded group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              e.target.src = '/api/placeholder-image.jpg';
                            }}
                          />
                        </div>
                        <h3 className="text-xs font-medium text-gray-900 text-center truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 text-center">₹{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* New Launches */}
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

            {/* Deals on Gaming Accessories */}
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
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
                  {dealsProducts.products.map(product => (
                    <ComputerProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>

            {/* Audio Products Row */}
            <section className="mb-8">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
                {audioProductsHook.products.slice(0, 10).map(product => (
                  <ComputerProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Up to 70% off */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Up to 70% off | Gaming Accessories ({discountProductsHook.products.length} items)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
                {discountProductsHook.products.map(product => (
                  <ComputerProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Featured products */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Featured products ({mainProducts.totalCount || 0} total)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
                {mainProducts.products.slice(8, 16).map((product, index) => (
                  <Link key={product.id || index} to={`/product/${product.id}`} className="group cursor-pointer">
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all p-4">
                      <div className="relative h-80 w-full aspect-[4/3] mb-2 rounded">
                        <img 
                          src={product.image || product.imgUrl || '/api/placeholder-image.jpg'} 
                          alt={product.name}
                          className="w-full h-full object-contain rounded"
                          onError={(e) => e.target.src = '/api/placeholder-image.jpg'}
                        />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-gray-500">₹{product.price} | {product.reviews} reviews</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Large Products */}
            <section className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {mainProducts.products.slice(-3).map(product => (
                  <ComputerProductCard key={product.id} product={product} size="large" />
                ))}
              </div>
            </section>



            {/* Main Product Grid */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">All Computer Accessories</h2>
              {mainProducts.loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 py-20">
                  {Array(20).fill().map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-64 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
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
                  Page {mainProducts.currentPage} of {mainProducts.totalPages} | {mainProducts.totalCount || mainProducts.total} total products
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </div>
  );
};

export default ComputerAccessories;
