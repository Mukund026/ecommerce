import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import ToysSidebar from '../components/ToysSidebar';
import CategoryIcons from '../components/CategoryIcons';
import HeroBanner from '../components/HeroBanner';
import FeaturedToys from '../components/FeaturedToys';
import ProductGrid from '../components/ProductGrid';
import TopBrands from '../components/TopBrands';
import BookBazaarBanner from '../components/BookBazaarBanner';
import Footer from '../components/Footer';
import ToyRooms from '../components/ToyRooms';
import { buildToysQueryParams } from '../data/toys';

const Toys = () => {
  // --- Section-specific product states ---
  const [featuredToys, setFeaturedToys] = useState([]);
  const [kidsRoomToys, setKidsRoomToys] = useState([]);
  const [outdoorToys, setOutdoorToys] = useState([]);
  const [dealsToys, setDealsToys] = useState([]);
  const [learningToys, setLearningToys] = useState([]);
  const [buildingToys, setBuildingToys] = useState([]);
  const [dollsToys, setDollsToys] = useState([]);
  const [mostLovedToys, setMostLovedToys] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('featured');

  // Main paginated grid driven by filters + sort + pagination
  const [mainGridProducts, setMainGridProducts] = useState([]);
  const [mainGridTotal, setMainGridTotal] = useState(0);
  const [mainGridLoading, setMainGridLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: [],
    ageRange: [],
    brands: [],
    price: null,
    rating: null,
    discount: [],
    outOfStock: false,
  });
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [playtimeProducts, setPlaytimeProducts] = useState([]);
  const [playtimeLoading, setPlaytimeLoading] = useState(false);

  // Helper to fetch a specific section
  const fetchSection = async (params, limit = 8) => {
    const res = await axios.get('/toys', {
      params: { ...params, limit },
      timeout: 15000,
    });
    return res.data.products || [];
  };

  // Fetch all sections on mount / sort change (curated sections only)
  const fetchAllSections = async (sortOption = 'featured') => {
    setLoading(true);
    setError(null);
    try {
      const [
        featured,
        kidsRoom,
        outdoor,
        deals,
        learning,
        building,
        dolls,
        mostLoved,
      ] = await Promise.all([
        // Featured: top-rated from any toy category
        fetchSection({ sort: 'rating', limit: 3 }, 3),
        // Kids room: tent, ball pits, slumber bags, playground
        fetchSection({
          category: "Kids' Play Tents & Tunnels,Kids' Ball Pits & Accessories,Kids' Slumber Bags,Play Sets & Playground Equipment",
          sort: sortOption,
        }, 3),
        // Outdoor: outdoor play, sandboxes, sports, pogo
        fetchSection({
          category: "Outdoor Play Toys,Sandboxes & Beach Toys,Toy Sports Equipment,Pogo Sticks & Hopping Toys",
          sort: sortOption,
        }, 8),
        // Deals: discounted products
        fetchSection({ deals: 'true', sort: 'featured' }, 8),
        // Learning & Educational
        fetchSection({ search: 'learning educational', sort: sortOption }, 8),
        // Building Blocks & Construction
        fetchSection({ search: 'building block construction', sort: sortOption }, 8),
        // Dolls & Accessories
        fetchSection({ search: 'doll accessory', sort: sortOption }, 8),
        // Customer Most Loved: top-rated toys
        fetchSection({ sort: 'rating', limit: 8 }, 8),
      ]);

      setFeaturedToys(featured);
      setKidsRoomToys(kidsRoom);
      setOutdoorToys(outdoor);
      setDealsToys(deals);
      setLearningToys(learning);
      setBuildingToys(building);
      setDollsToys(dolls);
      setMostLovedToys(mostLoved);
    } catch (err) {
      console.error('Error fetching toys:', err);
      setError('Failed to load toys. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSections(sort);
  }, [sort]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Fetch main paginated grid driven by filters + sort + pagination
  useEffect(() => {
    const fetchMainGrid = async () => {
      setMainGridLoading(true);
      try {
        const params = buildToysQueryParams(filters, {
          page: currentPage,
          limit: 20,
          sort,
        });
        const res = await axios.get('/toys', { params, timeout: 15000 });
        setMainGridProducts(res.data.products || []);
        setMainGridTotal(res.data.totalCount || 0);
      } catch (err) {
        console.error('Error fetching main grid:', err);
      } finally {
        setMainGridLoading(false);
      }
    };

    fetchMainGrid();
  }, [filters, sort, currentPage]);

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    setCurrentPage(1);
  };

  const PLAYTIME_CATEGORIES = [
    { id: 'cooking', emoji: '👩‍🍳', label: 'Cooking', search: 'kitchen cooking pretend play food' },
    { id: 'doctor', emoji: '🩺', label: 'Doctor', search: 'doctor medical kit hospital' },
    { id: 'dollhouse', emoji: '🏠', label: 'Dollhouse', search: 'dollhouse house playset' },
    { id: 'vehicles', emoji: '🚜', label: 'Vehicles', search: 'vehicle car truck tractor' },
    { id: 'science', emoji: '🔬', label: 'Science', search: 'science experiment STEM' },
    { id: 'art', emoji: '🎨', label: 'Art & Craft', search: 'art craft painting drawing' },
    { id: 'music', emoji: '🎸', label: 'Musical', search: 'music instrument musical' },
    { id: 'sports', emoji: '⚽', label: 'Sports', search: 'sports ball outdoor play' },
  ];

  const handlePlaytimeClick = async (searchQuery) => {
    setPlaytimeLoading(true);
    try {
      const products = await fetchSection({ search: searchQuery, sort: 'featured' }, 8);
      setPlaytimeProducts(products);
    } catch (err) {
      console.error('Error fetching playtime products:', err);
    } finally {
      setPlaytimeLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden mb-4 p-4 bg-white border rounded-lg shadow-sm">
          <button
            onClick={() => setShowSidebarMobile(!showSidebarMobile)}
            className="w-full flex items-center justify-between text-left font-semibold"
          >
            <span>Filters</span>
            <svg className={`w-5 h-5 transition-transform ${showSidebarMobile ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-6 py-6 lg:py-8">
          {/* Sidebar - Mobile Fullscreen & Desktop Fixed */}
          <div className={`lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto order-2 lg:order-1 ${showSidebarMobile ? 'block absolute z-50 top-0 left-0 right-0 bottom-0 bg-white shadow-2xl p-4 overflow-y-auto' : 'hidden lg:block lg:w-full lg:flex-shrink-0'}`}>
            <ToysSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <main className="order-1 lg:order-2 flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 pb-4 border-b">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Toys & Games</h1>
                <p className="text-lg text-gray-600">
                  {mainGridLoading ? 'Loading...' : `${mainGridTotal.toLocaleString()}+ results`}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 w-full lg:w-auto justify-between lg:justify-end">
                <div className="flex items-center gap-2 text-sm font-medium hidden sm:flex lg:flex">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full whitespace-nowrap">Sort by:</span>
                  <select
                    value={sort}
                    onChange={handleSortChange}
                    className="text-sm font-medium border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                {error}
                <button
                  onClick={() => fetchAllSections(sort)}
                  className="ml-4 underline font-semibold hover:text-red-900"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Content Sections */}
            <CategoryIcons />
            <HeroBanner />
            <FeaturedToys products={featuredToys} />
            <ToyRooms products={kidsRoomToys} />

            {/* Customer Most Loved */}
            <section className="mb-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-6 sm:p-12 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center drop-shadow-2xl">Customer most loved</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {loading && mostLovedToys.length === 0
                  ? Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="group text-center">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl animate-pulse shadow-lg mb-4" />
                        <div className="h-4 bg-white/20 rounded w-24 mx-auto animate-pulse" />
                      </div>
                    ))
                  : mostLovedToys.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group text-center hover:scale-105 transition-all duration-200"
                      >
                        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:bg-white/50 overflow-hidden p-2">
                          <img
                            src={product.image || '/api/placeholder-image.jpg'}
                            alt={product.title || 'Toy'}
                            className="w-full h-full object-contain drop-shadow-md"
                            onError={(e) => { e.target.src = '/api/placeholder-image.jpg'; }}
                            loading="lazy"
                          />
                        </div>
                        <p className="font-semibold text-white/95 text-base line-clamp-1">{product.title || product.name}</p>
                      </Link>
                    ))}
              </div>
            </section>

            <TopBrands />

            {/* What's Big in Playtime */}
            <section className="mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 text-white rounded-2xl p-6 sm:p-12 shadow-2xl overflow-hidden">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center drop-shadow-lg relative z-10">What's Big in Playtime</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {PLAYTIME_CATEGORIES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePlaytimeClick(item.search)}
                    className="group w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white/40 hover:bg-white rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-6 cursor-pointer"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                  </button>
                ))}
              </div>
              {playtimeLoading && (
                <div className="mt-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              {playtimeProducts.length > 0 && !playtimeLoading && (
                <div className="mt-8">
                  <ProductGrid
                    products={playtimeProducts}
                    cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    loading={false}
                  />
                </div>
              )}
            </section>

            {/* Outdoor Toys - matching category */}
            <section className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">Outdoor Toys</h2>
              <ProductGrid
                products={outdoorToys}
                cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                loading={loading}
              />
            </section>

            <BookBazaarBanner />

            {/* Main Product Listings - category-matching */}
            <ProductGrid
              title="Today's Top Toy Deals"
              products={dealsToys}
              cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              loading={loading}
            />
            <ProductGrid
              title="Learning & Educational Toys"
              products={learningToys}
              cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              loading={loading}
            />
            <ProductGrid
              title="Building Blocks & Construction"
              products={buildingToys}
              cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              loading={loading}
            />
            <ProductGrid
              title="Dolls & Accessories"
              products={dollsToys}
              cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              loading={loading}
            />

            {/* General Toys Grid (remaining products) */}
            <ProductGrid
              title="More Toys & Games"
              products={mainGridProducts}
              cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              loading={mainGridLoading}
            />

            {/* Pagination */}
            {!mainGridLoading && mainGridTotal > 0 && (
              <section className="mb-16 bg-white rounded-xl shadow-sm p-6 sm:p-8 border">
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  {Array.from({ length: Math.min(10, Math.ceil(mainGridTotal / 20)) }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 border rounded-md font-medium text-sm flex-shrink-0 w-12 h-12 transition-colors ${
                        pageNum === currentPage
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  {Math.ceil(mainGridTotal / 20) > 10 && (
                    <span className="px-3 py-2 text-gray-500 text-sm flex-shrink-0">...</span>
                  )}
                  <button
                    disabled={currentPage * 20 >= mainGridTotal}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="ml-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm whitespace-nowrap"
                  >
                    See more deals →
                  </button>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Toys;

