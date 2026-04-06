import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Categories for sidebar
const categories = [
  "Market Launchpad",
  "Market Renewed",
  "Apps & Games",
  "Baby Products",
  "Bags, Wallets and Luggage",
  "Beauty",
  "Books",
  "Car & Motorbike",
  "Clothing & Accessories",
  "Computers & Accessories",
  "Electronics",
  "Garden & Outdoors",
  "Gift Cards",
  "Grocery & Gourmet Foods",
  "Health & Personal Care",
  "Home & Kitchen",
  "Industrial & Scientific",
  "Jewellery",
  "Kindle Store",
  "Movies & TV Shows",
  "Music",
  "Musical Instruments",
  "Office Products",
  "Pet Supplies",
  "Shoes & Handbags",
  "Software",
  "Sports, Fitness & Outdoors",
  "Toys & Games",
  "Video Games",
  "Watches"
];

// Product data for each category
const bestsellersData = {
  Jewellery: [
    { rank: 1, name: "KAYASHA Kashmiri Ghungroo Glass Bangle Set", price: 419, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop", rating: 4.2, reviews: 1234 },
    { rank: 2, name: "JP's Plain and Glossy Finished Rainbow Glass Bangles", price: 299, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop", rating: 4.0, reviews: 856 },
    { rank: 3, name: "Shining Diva Fashion Necklace Set", price: 299, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop", rating: 4.3, reviews: 2341 },
    { rank: 4, name: "Sukkhi Ethnic Jhumka Earrings", price: 349, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop", rating: 4.1, reviews: 567 },
    { rank: 5, name: "Voylla Brass Gold Plated Ring", price: 199, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop", rating: 3.9, reviews: 423 },
  ],
  "Shoes & Handbags": [
    { rank: 1, name: "BRUTON EVA Lite Sport Shoes", price: 499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop", rating: 4.1, reviews: 3456 },
    { rank: 2, name: "Nike Mens Revolution 7 Running Shoes", price: 2271, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop", rating: 4.5, reviews: 8923 },
    { rank: 3, name: "DOCTOR EXTRA SOFT Care Flip Flops", price: 428, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=200&h=200&fit=crop", rating: 4.2, reviews: 1567 },
    { rank: 4, name: "BIRDE Unisex Running Shoes", price: 899, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop", rating: 4.0, reviews: 2134 },
    { rank: 5, name: "Skechers Men's Go Walk Shoes", price: 1899, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop", rating: 4.4, reviews: 4521 },
  ],
  Beauty: [
    { rank: 1, name: "Ghar Soaps Sandalwood & Saffron Soap", price: 288, image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=200&h=200&fit=crop", rating: 4.3, reviews: 2345 },
    { rank: 2, name: "L'Oreal Paris Permanent Hair Colour", price: 473, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop", rating: 4.1, reviews: 8923 },
    { rank: 3, name: "The Derma Co 1% Hyaluronic Sunscreen", price: 421, image: "https://images.unsplash.com/photo-1571781348782-8423285d8c8f?w=200&h=200&fit=crop", rating: 4.5, reviews: 5678 },
    { rank: 4, name: "Mamaearth Onion Hair Oil", price: 299, image: "https://images.unsplash.com/photo-1585232351009-31338186ce39?w=200&h=200&fit=crop", rating: 4.2, reviews: 12345 },
    { rank: 5, name: "Lotus Herbals Sunscreen SPF 50", price: 345, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop", rating: 4.0, reviews: 4567 },
  ],
  Electronics: [
    { rank: 1, name: "OnePlus Nord Buds 2", price: 1599, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop", rating: 4.3, reviews: 8934 },
    { rank: 2, name: "OnePlus Bullets Wireless Z3", price: 1499, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop", rating: 4.4, reviews: 12345 },
    { rank: 3, name: "Ambrane Unbreakable 3A Cable", price: 149, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", rating: 4.1, reviews: 34567 },
    { rank: 4, name: "boAt Airdopes 141", price: 1299, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop", rating: 4.2, reviews: 23456 },
    { rank: 5, name: "Samsung Galaxy Buds 2", price: 2499, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop", rating: 4.5, reviews: 7890 },
  ],
  "Garden & Outdoors": [
    { rank: 1, name: "Classic Mosquito Net Double Bed", price: 949, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop", rating: 4.0, reviews: 2345 },
    { rank: 2, name: "LifeKrafts Magnetic Mosquito Net Door", price: 889, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", rating: 4.2, reviews: 1567 },
    { rank: 3, name: "Weird Wolf 2 in 1 Rechargeable Mosquito Killer", price: 685, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", rating: 3.9, reviews: 890 },
    { rank: 4, name: "Garden Kneeler Seat", price: 799, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop", rating: 4.1, reviews: 567 },
    { rank: 5, name: "Plant Growth LED Light", price: 399, image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=200&h=200&fit=crop", rating: 4.3, reviews: 1234 },
  ],
  "Sports, Fitness & Outdoors": [
    { rank: 1, name: "Lifelong PVC Hex Dumbbells", price: 459, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop", rating: 4.2, reviews: 5678 },
    { rank: 2, name: "Slovic Pull Up Bar", price: 542, image: "https://images.unsplash.com/photo-1598971639058-3113324466c2?w=200&h=200&fit=crop", rating: 4.1, reviews: 2345 },
    { rank: 3, name: "Boldfit Hand Gripper", price: 161, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop", rating: 4.4, reviews: 8901 },
    { rank: 4, name: "Aurion Resistance Bands", price: 349, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=200&h=200&fit=crop", rating: 4.0, reviews: 4567 },
    { rank: 5, name: "Strauss Abdominal Exercise Equipment", price: 899, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop", rating: 4.3, reviews: 3456 },
  ],
};

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <div className="flex-shrink-0 w-48 md:w-56 p-3 bg-white hover:shadow-lg transition-shadow border border-gray-100 rounded">
      {/* Rank Badge */}
      <div className="mb-2">
        <span className="bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded">
          #{product.rank}
        </span>
      </div>
      
      {/* Product Image */}
      <div className="h-32 mb-3 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      
      {/* Product Name */}
      <h3 className="text-sm text-gray-800 line-clamp-2 mb-2 hover:text-orange-600 cursor-pointer">
        {product.name}
      </h3>
      
      {/* Price */}
      <p className="text-lg font-bold text-gray-900 mb-1">
        ₹{product.price.toLocaleString('en-IN')}
      </p>
      
      {/* Rating */}
      <div className="flex items-center gap-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-blue-600">{product.reviews.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

// Section Component
const BestsellerSection = ({ title, products }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <a href="#" className="text-sm text-blue-600 hover:underline">See More</a>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500">Page 1 of 7</span>
      </div>
      
      {/* Simple Grid instead of Swiper to avoid infinite scroll issues */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.rank} product={product} />
        ))}
      </div>
    </div>
  );
};

const Bestsellers = () => {
  const sections = [
    { title: "Bestsellers in Jewellery", products: bestsellersData.Jewellery },
    { title: "Bestsellers in Shoes & Handbags", products: bestsellersData["Shoes & Handbags"] },
    { title: "Bestsellers in Beauty", products: bestsellersData.Beauty },
    { title: "Bestsellers in Electronics", products: bestsellersData.Electronics },
    { title: "Bestsellers in Garden & Outdoors", products: bestsellersData["Garden & Outdoors"] },
    { title: "Bestsellers in Sports, Fitness & Outdoors", products: bestsellersData["Sports, Fitness & Outdoors"] },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Amazon Bestsellers</h1>
          <p className="text-sm text-gray-600">Our most popular products based on sales. Updated frequently.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Any Department</h2>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {sections.map((section, index) => (
              <BestsellerSection key={index} title={section.title} products={section.products} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-bold mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">About Amazon</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press Releases</a></li>
                <li><a href="#" className="hover:text-white">Amazon Science</a></li>
              </ul>
            </div>
            {/* Connect with Us */}
            <div>
              <h3 className="font-bold mb-4">Connect with Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
            {/* Make Money with Us */}
            <div>
              <h3 className="font-bold mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Sell on Amazon</a></li>
                <li><a href="#" className="hover:text-white">Sell under Amazon Accelerator</a></li>
                <li><a href="#" className="hover:text-white">Protect and Build Your Brand</a></li>
                <li><a href="#" className="hover:text-white">Amazon Global Selling</a></li>
                <li><a href="#" className="hover:text-white">Supply to Amazon</a></li>
                <li><a href="#" className="hover:text-white">Become an Affiliate</a></li>
                <li><a href="#" className="hover:text-white">Fulfilment by Amazon</a></li>
                <li><a href="#" className="hover:text-white">Advertise Your Products</a></li>
                <li><a href="#" className="hover:text-white">Amazon Pay on Merchants</a></li>
              </ul>
            </div>
            {/* Let Us Help You */}
            <div>
              <h3 className="font-bold mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Your Account</a></li>
                <li><a href="#" className="hover:text-white">Returns Centre</a></li>
                <li><a href="#" className="hover:text-white">Recalls and Product Safety Alerts</a></li>
                <li><a href="#" className="hover:text-white">100% Purchase Protection</a></li>
                <li><a href="#" className="hover:text-white">Amazon App Download</a></li>
                <li><a href="#" className="hover:text-white">Help</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌐</span>
                <select className="bg-transparent border border-gray-600 rounded px-3 py-1 text-sm">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                </select>
              </div>
              <span className="text-gray-400">India</span>
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              © 2024 Amazon.in, Inc. or its affiliates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;

