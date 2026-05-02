import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import API from "../api/axios";
import { fetchBookById } from "../api/booksApi";
import { allFreshProducts } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart, user } = useContext(AuthContext);

  useEffect(() => {
    // Check if we're on the books route
    const isBooksRoute = location.pathname.startsWith('/books');

    // If on books route, fetch from books API
    if (isBooksRoute) {
      const fetchBook = async () => {
        try {
          setLoading(true);
          console.log('Fetching book ID:', id);
          
const response = await fetchBookById(id);
          console.log('Book response:', response);
          
          // fetchBookById returns response.data directly (axios interceptors), so the API response is already unwrapped
          // The API returns {success: true, product: {...}}, so response IS the API data, not response.data
          const bookData = response.product || response;
          
          if (!bookData || !bookData._id) {
            throw new Error('Book not found');
          }

          const formattedBook = {
            _id: bookData._id,
            id: bookData._id,
            name: bookData.title || bookData.name,
            title: bookData.title || bookData.name,
            image: bookData.image || bookData.imgUrl || '/api/placeholder-image.jpg',
            price: bookData.price || 0,
            originalPrice: bookData.originalPrice || bookData.listPrice,
            listPrice: bookData.listPrice,
            discount: bookData.discount,
            rating: bookData.rating || bookData.stars || 0,
            stars: bookData.stars || bookData.rating || 0,
            reviews: bookData.reviews || 0,
            categoryName: bookData.categoryName || 'Books',
            description: bookData.description || bookData.title || '',
            author: bookData.author || ''
          };

          console.log('Formatted book:', formattedBook);
          setProduct(formattedBook);

// Fetch similar books - with more logging
          console.log('=== FETCHING SIMILAR BOOKS ===');
          try {
            // Get category for filtering similar products
            const bookCategory = formattedBook.categoryName || 'Books';
            const categoryParam = bookCategory !== 'Books' ? `&category=${encodeURIComponent(bookCategory)}` : '';
            console.log('Making API request to /books?limit=30' + categoryParam);
            
const booksRes = await API.get(`/books?limit=30${categoryParam}`);
            
            console.log('API Response received:', booksRes ? 'yes' : 'no');
            console.log('booksRes type:', typeof booksRes);
            if (booksRes) {
              console.log('booksRes keys:', Object.keys(booksRes));
              console.log('booksRes.data.products:', booksRes.data?.products ? `array(${booksRes.data.products.length})` : 'undefined');
            }
            
            // axios returns response at .data, so products are at booksRes.data.products
            const allBooks = booksRes?.data?.products || [];
            console.log('All books from API:', allBooks.length);
            
            // Current book ID
            const currentBookId = formattedBook._id;
            console.log('Current book ID to exclude:', currentBookId);
            
            // Filter by category first, then exclude current book
            const filtered = allBooks.filter(p => {
              const matches = p._id !== currentBookId;
              return matches;
            });
            console.log('After filter (excluded self):', filtered.length);
            
            // Get up to 6 similar products
            const similarBooks = filtered.slice(0, 6);
            console.log('Similar books count:', similarBooks.length);
            
            const similar = similarBooks.map((p, i) => {
              const safePrice = p.price || 0;
              const safeListPrice = p.listPrice || p.originalPrice || safePrice;
              return {
                _id: p._id,
                id: p._id,
                name: p.title || p.name || 'Untitled Book',
                title: p.title || p.name || 'Untitled Book',
                image: p.imgUrl || p.image || '/api/placeholder-image.jpg',
                imgUrl: p.imgUrl || p.image || '/api/placeholder-image.jpg',
                price: safePrice,
                originalPrice: safeListPrice,
                listPrice: safeListPrice,
                discount: p.discount || 0,
                rating: p.rating || p.stars || 0,
                stars: p.stars || p.rating || 0,
                reviews: p.reviews || 0,
                categoryName: p.categoryName || 'Books',
                description: p.description || '',
                author: p.author || '',
                isBook: true
              };
            });
            
            console.log('=== FINAL SIMILAR BOOKS ===');
            console.log('Count:', similar.length);
            console.log('Sample:', JSON.stringify(similar.slice(0,2), null, 2));
            
            setSimilarProducts(similar);
          } catch (simError) {
            console.error('Similar books fetch FAILED:', simError.message || simError);
            console.error('Error details:', simError);
            setSimilarProducts([]);
          }
        } catch (error) {
          console.error('Book fetch failed:', error);
          toast.error('Failed to load book details');
        } finally {
          setLoading(false);
        }
      };

      fetchBook();
      return;
    }

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

    // Backend fetch - prefer /products/:id first for reliable data, then /smartphones/:id
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('Fetching product ID:', id);
        
        let response;
        let apiData;
        
        // Try products/:id first (raw data, reliable)
        try {
          response = await API.get(`/products/${id}`);
          console.log('Products full response:', response);
          console.log('Products response.data:', response.data);
          
          // Handle successResponse wrapper {success, data, message} - common pattern
          if (response.data && typeof response.data === 'object') {
            if (response.data.success !== undefined) {
              apiData = response.data.data || response.data.product || response.data;
            } else {
              apiData = response.data;
            }
          } else {
            apiData = null;
          }
          
          if (!apiData) {
            throw new Error('No data in products response');
          }
          
          console.log('Products API extracted apiData:', apiData);
        } catch (productsErr) {
          console.warn('Products API failed:', productsErr.message);
          
          // Always try smartphones fallback
          try {
            response = await API.get(`/smartphones/${id}`);
            console.log('Smartphones full response:', response);
            apiData = response.data.product || response.data.data || response.data;
            console.log('Smartphones API extracted apiData:', apiData);
          } catch (smartphonesErr) {
            console.error('Both APIs failed:', smartphonesErr.message);
            throw productsErr;
          }
        }

        if (!apiData || !apiData._id) {
          throw new Error(`No product data received. apiData: ${JSON.stringify(apiData)}`);
        }

        // Robust price handling (handle price=0)
        let price = apiData.price || 0;
        if (price === 0 && apiData.price_details) {
          // Parse from price_details if available (smartphone format)
          const priceMatch = apiData.price_details?.match(/₹\\s?([\\d,]+)/);
          if (priceMatch) price = parseInt(priceMatch[1].replace(/,/g, ''));
        }
        price = Math.round(price * 83) || 999;  // INR conversion + round, default fallback

        const originalPrice = apiData.listPrice || apiData.originalPrice || Math.round(price * 1.2);
        const image = apiData.image || apiData.imgUrl || (Array.isArray(apiData.images_links) ? apiData.images_links[0] : apiData.images_links) || '/api/placeholder-image.jpg';
        
        const productData = {
          _id: apiData._id,
          id: apiData._id,
          name: apiData.title || apiData.name || apiData.names || 'Product',
          image,
          price,
          originalPrice,
          listPrice: originalPrice,
          rating: apiData.stars || 4.3,
          reviews: apiData.reviews || apiData['rating&reviews'] || 0,
          description: apiData.description,
          categoryName: (apiData.categoryName || 'Smartphones').toLowerCase().includes('smartphone') ? 'Smartphones' : (apiData.categoryName || 'Electronics')
        };
        
        console.log('Mapped productData:', productData);
        setProduct(productData);

        // Dynamic similar products by category
        try {
          const category = productData.categoryName;
          let similarRes;
          if (category && category.toLowerCase() !== 'smartphones') {
            // Use category filter for non-smartphones (e.g., Jewelry)
            similarRes = await API.get(`/products?categoryName=${encodeURIComponent(category)}&limit=30`);
          } else {
            // Smartphones fallback
            similarRes = await API.get('/smartphones?limit=30');
          }
          let similarProductsRaw = similarRes.data.products || [];
          
          // Generic fallback if no category matches
          if (similarProductsRaw.length === 0 && category) {
            console.log('No products in category, using generic');
            similarRes = await API.get('/products?limit=30');
            similarProductsRaw = similarRes.data.products || [];
          }
          
          const similar = similarProductsRaw
            .filter(p => p._id !== productData._id)
            .slice(0, 6)
            .map(p => ({
              ...p,
              image: p.image || p.imgUrl || (Array.isArray(p.images_links) ? p.images_links[0] : p.images_links) || '/api/placeholder-image.jpg',
              originalPrice: p.originalPrice || p.listPrice || Math.round((p.price || 999) * 1.2),
              price: p.price || 999 || (p.price_details ? parseInt((p.price_details.match(/₹\\s?([\\d,]+)/) || [])[1]?.replace(/,/g, '') || 999) : 999),
              id: p._id,
              rating: p.stars || 4.5,
              reviews: p['rating&reviews'] || p.reviews || 127,
              name: p.names || p.name || p.title || p.title
            }));
          console.log(`Similar products from ${category || 'generic'}:`, similar.length);
          setSimilarProducts(similar);
        } catch (simError) {
          console.error('Similar products fetch failed:', simError);
          setSimilarProducts([]);
        }
      } catch (error) {
        console.error('Product fetch failed:', error);
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

fetchProduct();
  }, [id, location]);

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
            className="w-full max-w-2xl h-[500px] object-contain rounded-xl shadow-2xl bg-gray-50"
            onError={(e) => { e.target.src = '/src/assets/grocery-apple.jpg'; }}
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

{/* Similar Products - always render section if similarProducts has items */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {product.categoryName ? `Similar ${product.categoryName} Products` : 'Similar Products You Might Like'}
        </h2>
        {/* Use flex wrap instead of grid for better compatibility */}
        <div className="flex flex-wrap gap-4 justify-center">
          {similarProducts.length > 0 ? (
            similarProducts.map((similar) => (
              <div key={similar._id || similar.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-[200px]">
                <ProductCard product={similar} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full py-8">
              No similar products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
