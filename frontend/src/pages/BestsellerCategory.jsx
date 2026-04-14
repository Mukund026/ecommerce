import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import ProductGrid from "../components/ProductGrid";
import SectionTitle from "../components/SectionTitle";

const BestsellerCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoryMap = {
          "Jewellery": "Fashion",
          "Shoes & Handbags": "Fashion",
          "Beauty": "Beauty",
          "Electronics": "Electronics",
          "Garden & Outdoors": "Garden & Outdoors",
          "Sports, Fitness & Outdoors": "Sports"
        };
        const dbCategory = categoryMap[category] || category;
        const res = await axios.get(
          `/bestsellers?category=${encodeURIComponent(dbCategory)}&page=${page}&limit=${limit}`
        );

        setProducts(res.data.products.map(product => ({
          ...product,
          image: product.image || product.imgUrl,
          name: product.title || product.name,
          rating: product.stars,
          id: product._id,
          isBestSeller: true,
          originalPrice: product.listPrice || product.price * 1.2
        })));
        setTotalPages(res.data.totalPages);
        setTotal(res.data.total);
      } catch (err) {
        console.error(err);
        setError('Failed to load bestsellers');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, page]);

  if (loading) return <div className="container mx-auto py-20 text-center text-xl font-semibold text-gray-500">Loading bestsellers...</div>;

  if (error || products.length === 0) return (
    <div className="container mx-auto py-20 text-center text-gray-500">
      No bestsellers found in {category}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link 
          to="/bestsellers" 
          className="inline-block mb-8 text-orange-600 hover:text-orange-700 font-semibold flex items-center"
        >
          ← Back to Bestsellers
        </Link>
        <SectionTitle title={`Bestsellers in ${category}`} subtitle={`Showing ${total} results`} />
        <ProductGrid 
          products={products.map((product, index) => ({ ...product, rank: (page - 1) * limit + index + 1 }))} 
          cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          loading={false}
        />
{totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2 bg-white p-4 rounded-xl shadow-lg">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                  page === p 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestsellerCategory;
