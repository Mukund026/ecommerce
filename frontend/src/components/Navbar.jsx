import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import LanguageDropdown from './LanguageDropdown';
import MegaDropdown from './MegaDropdown';
import LocationModal from './LocationModal';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showPrimeDropdown, setShowPrimeDropdown] = useState(false);
  const [showMegaDropdown, setShowMegaDropdown] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const { user, logout, cartCount } = useContext(AuthContext);
  const { formattedLocation } = useLocation();

  return (
    <div className="sticky top-0 z-50 relative">
{showLocationModal && (
        <LocationModal 
          isOpen={showLocationModal} 
          onClose={() => setShowLocationModal(false)} 
        />
      )}


      {/* ROW 1: Main Header - Amazon Dark Background #131921 */}
      <header className="bg-[#131921] text-white">
        <div className="max-w-screen-2xl mx-auto px-2">
          <div className="flex items-center justify-between h-16 gap-1">
            
            {/* LEFT: Logo + Location */}
            <div className="flex items-center shrink-0">
              {/* Amazon Logo */}
              <Link to="/" className="flex items-center py-2 px-2 hover:border rounded transition-colors">
                <span className="text-2xl font-bold">Market</span>
                <span className="text-[#23e3db] text-sm ml-0.5 mt-3">.in</span>
              </Link>

              {/* Delivery Location */}
              <div className="hidden md:flex items-center ml-2 py-2 px-2 hover:border rounded transition-colors cursor-pointer">
                <div className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <button
                  className="text-xs leading-tight bg-transparent border-none p-0 cursor-pointer hover:bg-gray-800 rounded flex flex-col items-start"
                  onClick={() => {
                    console.log('Button clicked, opening modal');
                    if (formattedLocation === 'your location') {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          () => setShowLocationModal(true),
                          () => setShowLocationModal(true)
                        );
                      } else {
                        setShowLocationModal(true);
                      }
                    } else {
                      setShowLocationModal(true);
                    }
                  }}
                >
                  <span className="block text-gray-300">Deliver to</span>
                  <span className="font-bold">{formattedLocation}</span>
                </button>
              </div>
            </div>

            {/* CENTER: Search Bar */}
            <div className="flex-1 max-w-4xl mx-2 hidden sm:block">
              <div className="flex rounded overflow-hidden">
                {/* Category Dropdown */}
                <select className="bg-gray-100 text-gray-700 text-sm px-2 py-2.5 border-r border-gray-300 cursor-pointer appearance-none hover:bg-gray-200 focus:outline-none rounded-l">
                  <option>All</option>
                  <option>Alexa Skills</option>
                  <option>Market Devices</option>
                  <option>Market Fashion</option>
                  <option>Market Fresh</option>
                  <option>Appliances</option>
                  <option>Apps & Games</option>
                  <option>Baby</option>
                  <option>Beauty</option>
                  <option>Books</option>
                  <option>Car & Motorbike</option>
                  <option>Clothing & Accessories</option>
                  <option>Computers & Accessories</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Garden & Outdoors</option>
                  <option>Gift Cards</option>
                  <option>Grocery & Gourmet Foods</option>
                  <option>Health & Personal Care</option>
                  <option>Home & Kitchen</option>
                  <option>Industrial Supplies</option>
                  <option>Jewellery</option>
                  <option>Kindle Store</option>
                  <option>Luggage & Bags</option>
                  <option>Luxury Beauty</option>
                  <option>Movies & TV Shows</option>
                  <option>Music</option>
                  <option>Musical Instruments</option>
                  <option>Office Products</option>
                  <option>Pet Supplies</option>
                  <option>Prime Video</option>
                  <option>Shoes & Handbags</option>
                  <option>Software</option>
                  <option>Sports, Fitness & Outdoors</option>
                  <option>Tools & Home Improvement</option>
                  <option>Toys & Games</option>
                  <option>Video Games</option>
                  <option>Watches</option>
                </select>
                
                {/* Search Input */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Market.in"
                  className="flex-1 px-4 py-2.5 text-gray-900 focus:outline-none bg-white"
                />
                
                {/* Search Button */}
                <button className="bg-[#febd69] hover:bg-[#f7ca00] px-6 py-2.5 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

{/* RIGHT: Language, Account, Returns, Cart */}
            <div className="flex items-center gap-0.5">
              {/* Language Selector */}
              <LanguageDropdown />

              {/* Account & Lists */}
              <div 
                className="relative hidden lg:block py-2 px-2 hover:border rounded transition-colors cursor-pointer"
                onMouseEnter={() => setShowAccountDropdown(true)}
                onMouseLeave={() => setShowAccountDropdown(false)}
              >
                <Link to={user ? "/dashboard" : "/login"} className="text-xs leading-tight">
                  <span className="block text-gray-300">Hello, {user ? user.name?.split(' ')[0] : 'sign in'}</span>
                  <span className="font-bold text-sm">Account & Lists</span>
                </Link>
                
                {/* Account Dropdown */}
                {showAccountDropdown && (
                  <div className="absolute top-full left-0 w-64 bg-white text-gray-900 shadow-xl rounded border p-4">
                    {user ? (
                      <div>
                        <p className="font-bold mb-2">Your Account</p>
                        <ul className="space-y-2 text-sm">
                          <li><a href="/dashboard" className="hover:underline">Your Account</a></li>
                          <li><a href="/orders" className="hover:underline">Your Orders</a></li>
                          <li><a href="/addresses" className="hover:underline">Your Addresses</a></li>
                          <li><a href="/lists" className="hover:underline">Your Lists</a></li>
                          <li><a href="/prime" className="hover:underline">Your Prime Membership</a></li>
                        </ul>
                        <button 
                          onClick={logout}
                          className="mt-4 w-full bg-orange-500 text-white py-1 rounded text-sm hover:bg-orange-600"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm mb-2">New customer?</p>
                        <a href="/register" className="text-blue-600 hover:underline text-sm">Start here</a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Returns & Orders */}
              <Link to={user ? "/dashboard" : "/login"} className="hidden lg:block py-2 px-2 hover:border rounded transition-colors">
                <div className="text-xs leading-tight">
                  <span className="block text-gray-300">Returns</span>
                  <span className="font-bold text-sm">& Orders</span>
                </div>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="flex items-center py-2 px-2 hover:border rounded transition-colors">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount || 0}
                  </span>
                </div>
                <span className="font-bold text-sm ml-1 hidden xl:block">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="sm:hidden px-2 pb-2">
          <div className="flex rounded overflow-hidden">
            <select className="bg-gray-100 text-gray-700 text-xs px-2 py-2 border-r border-gray-300 cursor-pointer appearance-none rounded-l">
              <option>All</option>
              <option>Fresh</option>
              <option>Mobiles</option>
              <option>Fashion</option>
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Amazon.in"
              className="flex-1 px-3 py-2 text-gray-900 text-sm focus:outline-none"
            />
            <button className="bg-[#febd69] hover:bg-[#f7ca00] px-4 py-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ROW 2: Category Menu - Amazon Dark Blue Background #232F3E */}
      <div className="bg-[#232F3E] text-white">
        <div className="max-w-screen-2xl mx-auto px-2">
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-hide">
            {/* All Menu with hamburger */}
            <button className="flex items-center gap-1 py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-bold">All</span>
            </button>

            {/* Fresh */}
<Link to="/fresh" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Fresh
            </Link>

            {/* MX Player */}
<Link to="/prime" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              MX Player
            </Link>

{/* Sell */}
            <Link to="/sell" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Sell
            </Link>

{/* Bestsellers */}
            <Link to="/bestsellers" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Bestsellers
            </Link>

            {/* Mobiles */}
            <Link to="/smartphones" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Mobiles
            </Link>

            {/* Customer Service */}
            <Link to="/help" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Customer Service
            </Link>

            {/* Today's Deals */}
            <Link to="/" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors text-orange-400">
              Today's Deals
            </Link>

            {/* Prime with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowPrimeDropdown(true)}
              onMouseLeave={() => setShowPrimeDropdown(false)}
            >
              <Link to="/prime" className="flex items-center gap-1 py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
                <span className="font-bold text-blue-200">Prime</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {showPrimeDropdown && (
                <div className="absolute top-full left-0 w-56 bg-white text-gray-900 shadow-xl rounded border p-4 z-50">
                  <p className="font-bold text-sm mb-2">Prime Members</p>
                  <ul className="space-y-2 text-xs">
                    <li><a href="/prime" className="hover:underline">Watch Prime Video</a></li>
                    <li><a href="/prime" className="hover:underline">Prime Music</a></li>
                    <li><a href="/prime" className="hover:underline">Free Fast Delivery</a></li>
                    <li><a href="/prime" className="hover:underline">Early Access</a></li>
                  </ul>
                </div>
              )}
            </div>

            {/* New Releases */}
<Link to="/hot-new-releases" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              New Releases
            </Link>

            {/* Fashion */}
            <Link to="/fashion" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Fashion
            </Link>

            {/* Amazon Pay */}
            <Link to="/dashboard" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Amazon Pay
            </Link>

            {/* Electronics with Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowMegaDropdown(true)}
              onMouseLeave={() => setShowMegaDropdown(false)}
            >
              <div 
                className="flex items-center gap-1 py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors cursor-pointer"
              >
                <span className="font-bold">Electronics</span>
                <Link to="/electronics" className="absolute inset-0" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <MegaDropdown 
                isOpen={showMegaDropdown} 
                onClose={() => setShowMegaDropdown(false)} 
              />
            </div>

            {/* Home & Kitchen */}
<Link to="/home-kitchen" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Home & Kitchen
            </Link>

            {/* Toys & Games */}
<Link to="/toys" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Toys & Games
            </Link>

            {/* Computers */}
<Link to="/computers" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Computers
            </Link>

            {/* Books */}
<Link to="/books" className="py-1.5 px-2 hover:border rounded text-sm whitespace-nowrap transition-colors">
              Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

