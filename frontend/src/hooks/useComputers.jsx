import { useState, useEffect } from 'react';
import API from '../api/axios.js';

// Custom hook for /api/computers endpoint (modeled after useSmartphones)
export const useComputers = (params = {}) => {
  const [data, setData] = useState({ products: [], loading: true, error: null, totalPages: 0 });

  const fetchComputers = async (pageParams = {}) => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await API.get('/computers', { 
        params: { 
          ...params, 
          ...pageParams,
          ...(params.maxPrice && { maxPrice: params.maxPrice }),
          includeBrands: "true",
          limit: params.limit || 20 
        } 
      });

      const resData = response.data;
      setData({ 
        products: resData.products || [], 
        brands: resData.brands || [], 
        totalPages: resData.totalPages || 1, 
        totalCount: resData.totalCount || 0,
        currentPage: resData.currentPage || 1,
        loading: false, 
        error: null 
      });
    
    } catch (err) {
      console.error('Computers fetch error:', err);
      setData({ products: [], loading: false, error: err.response?.data?.message || 'Failed to fetch computers' });
    }
  };

  useEffect(() => {
    fetchComputers(params);
  }, [JSON.stringify(params)]); 

  const refetch = () => fetchComputers();

  return { 
    products: data.products, 
    brands: data.brands,
    loading: data.loading, 
    error: data.error, 
    totalPages: data.totalPages,
    totalCount: data.totalCount,
    currentPage: data.currentPage,
    refetch 
  };

};
