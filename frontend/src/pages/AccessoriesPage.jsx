import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../api/axios.js";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const AccessoriesPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 20;
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        const response = await API.get('/accessories/', { 
          params: { 
            page, 
            limit
          } 
        });
        const mappedAccessories = (response.data.products || []).map(p => ({
          ...p,
          name: p.product_name,
          price: p.discounted_price,
          originalPrice: p.retail_price
        }));
        setAccessories(mappedAccessories);

        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Failed to fetch accessories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, [page]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading accessories...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">Mobile Accessories</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }} className="mb-8">

          {accessories.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="group">
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow h-full">
                <div className="h-48 flex items-center justify-center mb-4">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice?.toLocaleString()}</span>
                  )}
                </div>
                <p style={{fontSize: '14px', color: 'rgb(85, 85, 85)'}}>Brand: {product.brand}</p>
                <p style={{fontSize: '13px', color: 'rgb(119, 119, 119)'}} className="line-clamp-2">{product.description}</p>
                <span className="text-sm text-orange-600 font-medium">

                  {product.originalPrice && product.originalPrice > product.price 
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) + '% off'
                    : 'Best Price'
                  }
                </span>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination currentPage={page} totalPages={totalPages} basePath="/smartphones/accessories" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AccessoriesPage;

