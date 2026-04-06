import { useState, useEffect } from 'react';
import API from '../api/axios.js';

// Reusable hook for ALL product fetching
// Usage: const { products, loading, error, refetch, totalPages } = useProducts({ category: 'Computers', subcategory: 'Accessories', search: 'mouse', page: 1, limit: 20 });
export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (currentParams = params, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API.get('/products', { 
        params: { 
          ...currentParams, 
          page,
          limit: currentParams.limit || 20 
        } 
      });

      
      const data = response.data;
      
      // Normalize products to consistent format (handles backend variations)
      const normalized = (data.products || []).map(p => ({
        id: p._id,
        _id: p._id,
        title: p.title || p.name || 'Unnamed Product',
        name: p.title || p.name || 'Unnamed Product',
        price: p.price,
        listPrice: p.listPrice || p.price * 1.3,
        imgUrl: p.imgUrl || p.image || `https://via.placeholder.com/300x300/eeeeee?text=No+Image`,
        image: p.imgUrl || p.image || `https://via.placeholder.com/300x300/eeeeee?text=No+Image`,
        stars: p.stars || 0,
        reviews: p.reviews || 0,
        categoryName: p.categoryName,
        category: p.category,
        subcategory: p.subcategory,
        slug: (p.title || p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        isBestSeller: p.isBestSeller || false,
        description: p.description || ''
      }));

      setProducts(normalized);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error('Products fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(params, 1);
  }, [JSON.stringify(params)]); // Re-fetch when params change

  const refetch = () => fetchProducts(params, currentPage);

  return {
    products,
    loading,
    error,
    totalPages,
    currentPage,
    refetch,
    fetchNext: () => totalPages > currentPage && fetchProducts(params, currentPage + 1),
    fetchPrev: () => currentPage > 1 && fetchProducts(params, currentPage - 1)
  };
};

