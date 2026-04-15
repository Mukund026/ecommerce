import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import FreshCategoryNav from '../../components/FreshCategoryNav';
import SectionTitle from '../../components/SectionTitle';
import FreshProductCard from '../../components/FreshProductCard';
import Footer from '../../components/Footer';

const DynamicFreshSubcategory = () => {
  const { subcategory } = useParams();

  // Map subcategory slug to API type and title
  const subcategoryMap = {
    'millets': { type: 'millet', title: 'Millets & Flour' },
    'millet-other-flours': { type: 'millet', title: 'Millet & Other Flours' },
    'atta-flours': { type: 'atta', title: 'Atta & Flours' },
    'atta-rice-grains': { type: 'atta', title: 'Atta, Rice & Grains' },
    'rice': { type: 'rice', title: 'Rice' },
    'poha': { type: 'poha', title: 'Poha' },
    'whole-grains': { type: 'whole grains', title: 'Whole Grains' },
    'featured': { type: 'featured', title: 'Featured' },
    'supersaver': { type: 'supersaver', title: 'Supersaver' },
    'organic': { type: 'organic', title: 'Organic' },
    'tea-coffee-drink-mixes': { type: 'tea-coffee-drinks', title: 'Tea, Coffee & Drink Mixes' },
    'chips-biscuits': { type: 'chips-biscuits', title: 'Chips & Biscuits' },
    'bath-body': { type: 'bath', title: 'Bath & Body' },
    'fruits-vegetables': { type: 'fruits-vegetables', title: 'Fruits & Vegetables' },
    'rice-atta-dal': { type: 'rice-atta-dal', title: 'Rice, Atta & Dal' },
    'oil-ghee': { type: 'oil-ghee', title: 'Oil & Ghee' },
    'milk-dairy': { type: 'milk-dairy', title: 'Milk & Dairy' },
    'bakery-bread': { type: 'bakery-bread', title: 'Bakery & Bread' },
    'eggs-meat-fish': { type: 'eggs-meat-fish', title: 'Eggs, Meat & Fish' },
    'spices-seasonings': { type: 'spices-seasonings', title: 'Spices & Seasonings' },
    'snacks-biscuits': { type: 'snacks-biscuits', title: 'Snacks & Biscuits' }
  };

  const config = subcategoryMap[subcategory] || { type: subcategory, title: subcategory.replace(/-/g, ' ').toUpperCase() };

  const { products, loading, error, refetch, totalPages, currentPage, fetchNext, fetchPrev } = useProducts({
    categoryName: 'Grocery',
    ...config,
    page: 1,
    limit: 20
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-500">Loading {config.title} products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4 text-lg">{error}</p>
        <button
          onClick={refetch}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FreshCategoryNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          {config.title}{' '}
          <span className="text-sm text-gray-500">
            (Live from Database)
          </span>
        </h1>

        <section className="mb-16">
          <SectionTitle
            title={config.title}
            subtitle={`Healthy ${config.title.toLowerCase()} varieties`}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <FreshProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button 
                onClick={fetchPrev} 
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Prev
              </button>
              <span className="px-4 py-2 bg-white border rounded">{currentPage} / {totalPages}</span>
              <button 
                onClick={fetchNext} 
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DynamicFreshSubcategory;
