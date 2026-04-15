import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import SectionTitle from "../components/SectionTitle";
import CategoryHeading from "../components/CategoryHeading";

const Bestsellers = () => {
  const [sectionData, setSectionData] = useState({});
  const [sectionLoading, setSectionLoading] = useState({});
  const [sectionErrors, setSectionErrors] = useState({});

  const categoryMap = {
    "Jewellery": ["Women's Jewelry"],
    "Shoes & Handbags": ["Women's Handbags"],
    "Beauty": ["Skin Care Products"],
    "Electronics": ["Electronics"],
    "Garden & Outdoors": ["Garden Structures  Germination Equipment"],
    "Sports, Fitness & Outdoors": ["Sport Specific Clothing"]
  };

  const categoriesToFetch = [
    "Jewellery",
    "Shoes & Handbags",
    "Beauty",
    "Electronics",
    "Garden & Outdoors",
    "Sports, Fitness & Outdoors",
  ];

  const fetchCategory = async (frontendCat) => {
    setSectionLoading(prev => ({ ...prev, [frontendCat]: true }));
    setSectionErrors(prev => ({ ...prev, [frontendCat]: null }));

    try {
      const categories = categoryMap[frontendCat];
      const res = await axios.get("/bestsellers", {
        params: {
          category: categories.join(","),
          limit: 5
        },
        timeout: 10000
      });

      setSectionData(prev => ({
        ...prev,
        [frontendCat]: res.data.products.map(product => ({
          ...product,
          image: product.image || product.imgUrl,
          name: product.title || product.name,
          rating: product.stars,
          id: product._id,
          isBestSeller: true,
          originalPrice: (product.listPrice || product.price * 1.2) * 83,
          price: product.price * 83
        }))
      }));
    } catch (err) {
      console.error(`Error fetching ${frontendCat}:`, err);
      setSectionErrors(prev => ({ ...prev, [frontendCat]: 'Failed to load this category' }));
    } finally {
      setSectionLoading(prev => ({ ...prev, [frontendCat]: false }));
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      const promises = categoriesToFetch.map((frontendCat, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            fetchCategory(frontendCat);
            resolve(null);
          }, index * 150); // 150ms stagger
        })
      );
      await Promise.all(promises);
    };

    fetchAll();
  }, []);

  const sections = categoriesToFetch.map((cat) => ({
    title: `Bestsellers in ${cat}`,
    products: sectionData[cat] || [],
    loading: sectionLoading[cat] || false,
    error: sectionErrors[cat]
  }));

  const allLoading = Object.values(sectionLoading).some(l => l === undefined) || Object.values(sectionLoading).every(l => l);
  if (allLoading && Object.keys(sectionData).length === 0) return <div className="container mx-auto py-20 text-center text-xl font-semibold text-gray-500">Loading bestsellers...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeading />
      <div className="container mx-auto px-4 py-12 space-y-20">
        {sections.map(({ title, products, loading, error }) => {
          if (loading) {
            return (
              <div key={title} className="animate-pulse">
                <SectionTitle title={title} />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-80 bg-gray-200 rounded-lg"></div>
              </div>
            );
          }

          if (error) {
            return (
              <div key={title} className="text-center py-12 bg-red-50 border border-red-200 rounded-xl">
                <SectionTitle title={title} />
                <p className="text-red-500 text-lg">{error}</p>
              </div>
            );
          }

          return (
            <div key={title}>
              <SectionTitle title={title} />
              <ProductGrid
                products={products}
                cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                loading={false}
              />
              {products.length > 0 && (
                <div className="text-center mt-8">
                  <Link
                    to={`/bestsellers/${encodeURIComponent(title.split(' in ')[1])}`}
                    className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-8 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                  >
                    See More
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bestsellers;
