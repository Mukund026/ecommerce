import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FashionCategoryNav from '../components/FashionCategoryNav';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import * as productsApi from '../api/productsApi';

// Fashion subcategories to display
const fashionCategories = [
  { name: "Women", path: "/fashion/women", category: "Women", count: 15743 },
  { name: "Women's Accessories", path: "/fashion/women-accessories", category: "Women's Accessories", count: 10186 },
  { name: "Women's Clothing", path: "/fashion/women-clothing", category: "Women's Clothing", count: 9525 },
  { name: "Women's Handbags", path: "/fashion/women-handbags", category: "Women's Handbags", count: 16146 },
  { name: "Women's Health & Family Planning", path: "/fashion/women-health", category: "Women's Health  Family Planning", count: 8535 },
  { name: "Women's Jewelry", path: "/fashion/women-jewelry", category: "Women's Jewelry", count: 12848 },
  { name: "Women's Shoes", path: "/fashion/women-shoes", category: "Women's Shoes", count: 17948 },
  { name: "Women's Watches", path: "/fashion/women-watches", category: "Women's Watches", count: 18437 },
  { name: "Men", path: "/fashion/men", category: "Men", count: 16176 },
  { name: "Men's Accessories", path: "/fashion/men-accessories", category: "Men's Accessories", count: 12046 },
  { name: "Men's Clothing", path: "/fashion/men-clothing", category: "Men's Clothing", count: 10099 },
  { name: "Men's Jewelry", path: "/fashion/men-jewelry", category: "Men's Jewelry", count: 18448 },
  { name: "Men's Shoes", path: "/fashion/men-shoes", category: "Men's Shoes", count: 18693 },
  { name: "Men's Watches", path: "/fashion/men-watches", category: "Men's Watches", count: 18672 },
  { name: "Sporting Apparel", path: "/fashion/sporting-apparel", category: "Sporting Apparel", count: 6068 },
  { name: "Sport Specific Clothing", path: "/fashion/sport-clothing", category: "Sport Specific Clothing", count: 7563 },
  { name: "Shaving & Hair Removal", path: "/fashion/shaving-hair-removal", category: "Shaving  Hair Removal Products", count: 17938 },
  { name: "Shelf Brackets & Supports", path: "/fashion/shelf-brackets", category: "Shelf Brackets  Supports", count: 9028 },
  { name: "Shoe, Jewelry & Watch Accessories", path: "/fashion/jewelry-accessories", category: "Shoe, Jewelry  Watch Accessories", count: 14855 },
  { name: "Perfume & Cologne", path: "/fashion/perfume", category: "Perfume  Cologne", count: 18794 },
];

const AmazonFashion = () => {
  const [selectedCategory, setSelectedCategory] = useState("Women");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  // Fetch products based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        switch (selectedCategory) {
          case "Women":
            data = await productsApi.getWomenProducts(1, 20);
            break;
          case "Women's Accessories":
            data = await productsApi.getWomenAccessories(1, 20);
            break;
          case "Women's Clothing":
            data = await productsApi.getWomenClothing(1, 20);
            break;
          case "Women's Handbags":
            data = await productsApi.getWomenHandbags(1, 20);
            break;
          case "Women's Health  Family Planning":
            data = await productsApi.getWomenHealth(1, 20);
            break;
          case "Women's Jewelry":
            data = await productsApi.getWomenJewelry(1, 20);
            break;
          case "Women's Shoes":
            data = await productsApi.getWomenShoes(1, 20);
            break;
          case "Women's Watches":
            data = await productsApi.getWomenWatches(1, 20);
            break;
          case "Men":
            data = await productsApi.getMenProducts(1, 20);
            break;
          case "Men's Accessories":
            data = await productsApi.getMenAccessories(1, 20);
            break;
          case "Men's Clothing":
            data = await productsApi.getMenClothing(1, 20);
            break;
          case "Men's Jewelry":
            data = await productsApi.getMenJewelry(1, 20);
            break;
          case "Men's Shoes":
            data = await productsApi.getMenShoes(1, 20);
            break;
          case "Men's Watches":
            data = await productsApi.getMenWatches(1, 20);
            break;
          case "Sporting Apparel":
            data = await productsApi.getSportingApparel(1, 20);
            break;
          case "Sport Specific Clothing":
            data = await productsApi.getSportClothing(1, 20);
            break;
          case "Shaving  Hair Removal Products":
            data = await productsApi.getShavingProducts(1, 20);
            break;
          case "Shelf Brackets  Supports":
            data = await productsApi.getShelfBrackets(1, 20);
            break;
          case "Shoe, Jewelry  Watch Accessories":
            data = await productsApi.getJewelryAccessories(1, 20);
            break;
          case "Perfume  Cologne":
            data = await productsApi.getPerfume(1, 20);
            break;
          default:
            data = await productsApi.getWomenProducts(1, 20);
        }
        setProducts(data.products || []);
        setPagination({
          page: data.page || 1,
          limit: data.limit || 20,
          total: data.total || 0,
          totalPages: data.totalPages || 0,
          hasNext: data.hasNext || false,
          hasPrev: data.hasPrev || false
        });
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  // Get current category info
  const currentCat = fashionCategories.find(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      <FashionCategoryNav />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Fashion</h1>
          <p className="text-xl text-gray-600 mt-1">
            Shop from {pagination.total.toLocaleString()}+ products
          </p>
        </div>

        {/* Fashion Categories Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {fashionCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                onClick={() => handleCategoryClick(cat.category)}
                className={`p-4 bg-white border-2 rounded-xl text-center hover:border-orange-500 hover:shadow-md transition-all ${
                  selectedCategory === cat.category ? 'border-orange-500 shadow-md' : 'border-gray-200'
                }`}
              >
                <span className="text-sm font-medium text-gray-900">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Products Section */}
        <div className="mb-8">
          <div className="mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {currentCat?.name || 'Fashion'}
              </h2>
              <p className="text-xl text-gray-600 mt-1">
                {pagination.total.toLocaleString()}+ results
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-4 py-2 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Reviews</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid products={products} loading={loading} />
        </div>

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNext}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AmazonFashion;
