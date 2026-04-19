import { useState, useEffect } from 'react';
import API from '../api/axios.js';
import { useProducts } from './useProducts'; // Reuse normalization

// Custom hook for /api/smartphones endpoint
export const useSmartphones = (params = {}) => {
  const [data, setData] = useState({ products: [], loading: true, error: null, totalPages: 0 });

  const fetchSmartphones = async (pageParams = {}) => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await API.get('/smartphones', { 
        params: { 
          ...params, 
          ...pageParams,
          ...(params.maxPrice && { maxPrice: params.maxPrice }),
          includeBrands: true,
          limit: params.limit || 20 
        } 
      });

      const resData = response.data;
      setData({ 
        products: resData.products || [], 
        brands: resData.brands || [], 
        totalPages: resData.totalPages || 1, 
        loading: false, 
        error: null 
      });
    
    } catch (err) {
      console.error('Smartphones fetch error:', err);
      setData({ products: [], loading: false, error: err.response?.data?.message || 'Failed to fetch smartphones' });
    }
  };

  useEffect(() => {
    fetchSmartphones(params);
  }, [params.page, params.limit]);

  const refetch = () => fetchSmartphones();

  return { 
    smartphones: data.products, 
    brands: data.brands,
    loading: data.loading, 
    error: data.error, 
    totalPages: data.totalPages, 
    refetch 
  };
};
