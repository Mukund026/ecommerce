import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FreshNavbar from '../../components/FreshNavbar';
import FreshCategoryNav from '../../components/FreshCategoryNav';
import CategoryCard from '../../components/CategoryCard';
import FreshProductCard from '../../components/FreshProductCard';
import SectionTitle from '../../components/SectionTitle';
import Footer from '../../components/Footer';
import HeroSlider from '../../components/HeroSlider';
import API from '../../api/axios.js';
import { freshCategories } from '../../data/products';

const Fresh = () => {
  const [groceryProducts, setGroceryProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroceryProducts = async () => {
      try {
        setLoading(true);
        setError(null);
const response = await API.get('/products?page=1&limit=20');
        const data = response.data.products || [];

        // Debug logs as requested
        console.log('Full API Response:', response);
        console.log('Response data array:', data);
        console.log('Number of products:', data.length);
        console.log('First product object:', data[0]);

        // Readable table for key fields
        const productTable = data.map(item => ({
          title: item.title || item.name,
          categoryName: item.categoryName,
          price: item.price,
          _id: item._id
        }));
        console.table(productTable);

        // Loop through all products
        data.forEach((item, index) => {
          console.log(index, item.title || item.name, item.categoryName);
        });

        const groceryItems = data;
        console.log("PRODUCTS:", groceryItems);
        const productsWithSlug = groceryItems.map((p) => ({
          ...p,
          section: 'grocery',
          id: p._id,
          slug: (p.name || p.title)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
          image: p.imgUrl || p.image || '',
          imgUrl: p.imgUrl || p.image || ''
        }));
        setGroceryProducts(productsWithSlug);
        console.log('Products with images:', productsWithSlug.slice(0, 3));
      } catch (error) {
        console.error("Error fetching products:", error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchGroceryProducts();
  }, []);

  const renderProducts = () => {
    if (loading) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-500">Loading products...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      );
    }

    if (groceryProducts.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">"No products available"</p>
        </div>
      );
    }

    return groceryProducts.map((product) => (
      <div key={product._id || product.id} className="relative">
        <div className="absolute top-0 left-0 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-br-lg z-10">
          {product.categoryName || 'No Category'}
        </div>
        <FreshProductCard product={product} />
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 3rd Category Navbar for Fresh items */}
      <FreshNavbar />
      <div className="flex items-center text-3xl font-bold bg-white p-2">
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.igFeDMiuQzuJGUK212oSxgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Atta"
          className="w-10 h-10 mr-4"
        />
        Atta, rice & grains
      </div>
      <FreshCategoryNav />

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 py-6">

        {/* Hero Slider */}
        <section className="mb-8">
          <HeroSlider />
        </section>

        {/* Browse by Category Section */}
        <section className="mb-8">
          <SectionTitle
            title="Browse by Category"
            subtitle="Explore fresh items in every category"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {freshCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle
            title="Grocery Products"
            subtitle="Fresh grocery items"
            action={{ text: "See all", link: "#" }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-white rounded-lg p-6">
            {renderProducts()}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Fresh;
