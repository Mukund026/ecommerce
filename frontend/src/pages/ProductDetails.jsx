import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import toast from "react-hot-toast";
import API from "../api/axios";
import { allFreshProducts } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart, user } = useContext(AuthContext);

  useEffect(() => {
    // Fallback to static data for frontend slugs (like original behavior)
    const staticProduct = allFreshProducts.find(p => p.slug === id || p.id.toString() === id);
    if (staticProduct) {
      setProduct(staticProduct);
      const similar = allFreshProducts.filter(p => p.id !== staticProduct.id).slice(0, 6);
      setSimilarProducts(similar);
      return;
    }

    // Skip backend fetch for frontend static slugs - avoid 500 errors
    if (allFreshProducts.find(p => p.slug === id || p.id.toString() === id)) {
      return;
    }

    // Backend fetch - prefer /smartphones/:id first, fallback to /products/:id
    const fetchProduct = async () => {
      try {
        setLoading(true);
        let response;
        try {
          response = await API.get(`/smartphones/${id}`);
        } catch {
          response = await API.get(`/products/${id}`);
        }
        const apiData = response.data.product || response.data;
        const productData = {
          _id: apiData._id,
          name: apiData.name || apiData.names,
          image: Array.isArray(apiData.images_links)
            ? apiData.images_links[0]
            : apiData.image || apiData.imgUrl,
          price: apiData.price,
          originalPrice: apiData.listPrice,
          rating: apiData.stars,
          reviews: apiData.reviews,
          description: apiData.description,
          categoryName: apiData.categoryName,
          id: apiData._id
        };
        setProduct(productData);

        // Fetch similar products
        const categoryName = productData.categoryName || 'Smartphones';
        const similarRes = await API.get(`/smartphones?category=${encodeURIComponent(categoryName)}&limit=8`);
        const similarProductsRaw = similarRes.data?.products || [];
        const similar = similarProductsRaw.slice(0, 6).filter(p => p._id !== productData._id).map(p => ({
          ...p,
          name: p.name || p.names,
          image: p.image || p.images_links,
          originalPrice: p.listPrice,
          id: p._id,
          rating: p.stars || 4.5,
          reviews: p.reviews || 127
        }));
        setSimilarProducts(similar);
      } catch (error) {
        console.error('Product fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    const result = await addToCart(product._id || product.id);
    if (result.success) {
      toast.success("Added to cart successfully!");
    } else {
      toast.error(result.message || "Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading product...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔍</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-lg text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="flex justify-center lg:justify-end">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-2xl h-[500px] object-contain rounded-xl shadow-2xl"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-2xl text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full ml-4">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Add to Cart
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Similar Products You Might Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarProducts.map((similar) => (
              <ProductCard key={similar._id || similar.id} product={similar} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
