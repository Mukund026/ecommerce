import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as productsApi from '../api/productsApi';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import FashionCategoryNav from '../components/FashionCategoryNav';

const categoryMap = {
  'women': { name: "Women", api: productsApi.getWomenProducts, title: "Women's Fashion" },
  'women-accessories': { name: "Women's Accessories", api: productsApi.getWomenAccessories, title: "Women's Accessories" },
  'women-clothing': { name: "Women's Clothing", api: productsApi.getWomenClothing, title: "Women's Clothing" },
  'women-handbags': { name: "Women's Handbags", api: productsApi.getWomenHandbags, title: "Women's Handbags" },
  'women-health': { name: "Women's Health  Family Planning", api: productsApi.getWomenHealth, title: "Women's Health & Family Planning" },
  'women-jewelry': { name: "Women's Jewelry", api: productsApi.getWomenJewelry, title: "Women's Jewelry" },
  'women-shoes': { name: "Women's Shoes", api: productsApi.getWomenShoes, title: "Women's Shoes" },
  'women-watches': { name: "Women's Watches", api: productsApi.getWomenWatches, title: "Women's Watches" },
  'men': { name: "Men", api: productsApi.getMenProducts, title: "Men's Fashion" },
  'men-accessories': { name: "Men's Accessories", api: productsApi.getMenAccessories, title: "Men's Accessories" },
  'men-clothing': { name: "Men's Clothing", api: productsApi.getMenClothing, title: "Men's Clothing" },
  'men-jewelry': { name: "Men's Jewelry", api: productsApi.getMenJewelry, title: "Men's Jewelry" },
  'men-shoes': { name: "Men's Shoes", api: productsApi.getMenShoes, title: "Men's Shoes" },
  'men-watches': { name: "Men's Watches", api: productsApi.getMenWatches, title: "Men's Watches" },
  'sporting-apparel': { name: "Sporting Apparel", api: productsApi.getSportingApparel, title: "Sporting Apparel" },
  'sport-clothing': { name: "Sport Specific Clothing", api: productsApi.getSportClothing, title: "Sport Specific Clothing" },
  'shaving-hair-removal': { name: "Shaving  Hair Removal Products", api: productsApi.getShavingProducts, title: "Shaving & Hair Removal Products" },
  'shelf-brackets': { name: "Shelf Brackets  Supports", api: productsApi.getShelfBrackets, title: "Shelf Brackets & Supports" },
  'jewelry-accessories': { name: "Shoe, Jewelry  Watch Accessories", api: productsApi.getJewelryAccessories, title: "Shoe, Jewelry & Watch Accessories" },
  'perfume': { name: "Perfume  Cologne", api: productsApi.getPerfume, title: "Perfume & Cologne" },
'kids': { name: "Kids' Slumber Bags", api: productsApi.getKidsProducts, title: "Kids' Slumber Bags" },
  'bags-luggage': { name: "Luggage  Travel Gear", api: productsApi.getLuggageProducts, title: "Luggage & Travel Gear" },
  'deals': { name: "Fashion Deals", api: productsApi.getFashionDeals, title: "Fashion Deals" },
};

const FashionCategory = () => {
  const location = useLocation();
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

  // Extract category from URL path (e.g., /fashion/women -> women)
  const pathParts = location.pathname.split('/fashion/');
  const categoryKey = pathParts[1] || 'women';
  const categoryInfo = categoryMap[categoryKey] || categoryMap['women'];
  const { api: fetchProducts, title } = categoryInfo;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(pagination.page, pagination.limit);
        setProducts(data.products || []);
        setPagination(prev => ({
          ...prev,
          total: data.total || 0,
          totalPages: data.totalPages || 0,
          hasNext: data.hasNext || false,
          hasPrev: data.hasPrev || false
        }));
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryKey, pagination.page, pagination.limit]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <FashionCategoryNav />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{title}</h1>
          <p className="text-xl text-gray-600 mt-1">
            {pagination.total.toLocaleString()}+ results
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} />

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

export default FashionCategory;
