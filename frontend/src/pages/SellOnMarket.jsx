import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SellOnMarket = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Side - Text */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Launch your business & get benefits up to ₹41,000*
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-200">
                Register with a valid GSTIN and an active bank account to become a Market.in seller.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Start Selling
              </button>
              <p className="text-xs mt-4 text-gray-300">*T&C apply</p>
            </div>

            {/* Right Side - Image */}
            <div className="md:w-1/2 flex justify-center relative">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop" 
                alt="Seller with packages" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
              
              {/* Floating Cards */}
              <div className="absolute top-4 -left-4 bg-white text-gray-800 p-3 rounded-lg shadow-lg">
                <p className="text-orange-600 font-bold text-lg">₹26,000</p>
                <p className="text-xs text-gray-600">Ad Credits</p>
              </div>
              <div className="absolute bottom-16 -left-8 bg-white text-gray-800 p-3 rounded-lg shadow-lg">
                <p className="text-orange-600 font-bold text-lg">₹11,000</p>
                <p className="text-xs text-gray-600">FBA Fee Waiver</p>
              </div>
              <div className="absolute top-1/2 -right-4 bg-white text-gray-800 p-3 rounded-lg shadow-lg">
                <p className="text-orange-600 font-bold text-lg">₹5,000</p>
                <p className="text-xs text-gray-600">Selection Rewards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NEW SELLER INCENTIVE SECTION */}
      <section className="py-12 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
            NEW New Seller Incentive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <p className="text-4xl font-bold text-orange-600 mb-2">₹26,000</p>
              <p className="text-gray-700 font-medium">Ad credits & 2-month free Accelerate Program</p>
            </div>
            {/* Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <p className="text-4xl font-bold text-blue-600 mb-2">₹10,000</p>
              <p className="text-gray-700 font-medium">Fee waiver for processing order via FBA for the first time</p>
            </div>
            {/* Card 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <p className="text-4xl font-bold text-green-600 mb-2">₹5,000</p>
              <p className="text-gray-700 font-medium">Selection rewards by bringing more selection</p>
            </div>
          </div>
          <div className="mt-6">
            <a href="#" className="text-blue-600 hover:underline font-medium">Know more →</a>
          </div>
        </div>
      </section>

      {/* 3. PROMOTION BENEFITS SECTION */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Multi-unit Purchase Benefits</h3>
              <p className="text-gray-600 mb-4">
                Sellers can gain benefits on multi-unit purchases and promotions like "Buy 2, Get 10% OFF"
              </p>
              <a href="#" className="text-blue-600 hover:underline font-medium">Create promotions here →</a>
            </div>
            {/* Card 2 */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-white">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3">
                  <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">If Amazon Bazaar</span>
                  <h3 className="text-xl font-bold mt-3 mb-2">Zero Referral Fees</h3>
                  <p className="text-purple-100 mb-4">
                    Zero referral fees on categories and up to ₹18 weight handling fee reduction.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=150&fit=crop" 
                    alt="Illustration" 
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW TO SELL SECTION */}
      <section className="py-12 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">
            How to sell on Market.in?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Register your account</h3>
              <p className="text-gray-600 text-sm">Register on Market with GST/PAN details and bank account</p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Choose storage & shipping</h3>
              <p className="text-gray-600 text-sm">Choose storage, packaging and delivery options</p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">List your products</h3>
              <p className="text-gray-600 text-sm">List products by providing product and brand details</p>
            </div>
            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Complete orders & get paid</h3>
              <p className="text-gray-600 text-sm">Deliver orders and get paid within 7 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY BECOME A SELLER SECTION */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">
            Why Become a Seller?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Crores of customers</h3>
              <p className="text-gray-600">Reach crores of customers on Market, India's most visited shopping destination.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">26,800 crore-pati sellers</h3>
              <p className="text-gray-600">95,500 lakhpati sellers in 2023 alone.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Unbeatable reach</h3>
              <p className="text-gray-600">Deliver to 100% of India's serviceable pincodes through fulfillment network.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Start Selling
            </button>
          </div>
        </div>
      </section>

      {/* 6. SELLER TESTIMONIAL SECTION */}
      <section className="py-12 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">
            Here's what Market sellers are saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" 
                    alt="Seller" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 italic mb-4">"We grew our business from a small team to now shipping 500+ orders daily thanks to Market.in."</p>
                  <p className="font-bold">Rajesh Kumar</p>
                  <p className="text-gray-500 text-sm">Brand: StyleHub</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" 
                    alt="Seller" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 italic mb-4">"We scaled from ₹10,000 in sales to ₹5 lakh within 3 months. The best platform for sellers!"</p>
                  <p className="font-bold">Priya Sharma</p>
                  <p className="text-gray-500 text-sm">Brand: HomeDecor Plus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start selling today</h2>
              <p className="text-xl text-gray-200 mb-6">Put your products in front of crores of customers across India.</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Start Selling
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=300&fit=crop" 
                alt="Delivery truck and airplane" 
                className="rounded-lg shadow-2xl max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <section className="bg-gray-800 text-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-bold mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press Releases</a></li>
                <li><a href="#" className="hover:text-white">Market Science</a></li>
              </ul>
            </div>
            {/* Connect With Us */}
            <div>
              <h3 className="font-bold mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
            {/* Make Money With Us */}
            <div>
              <h3 className="font-bold mb-4">Make Money With Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Sell on Market</a></li>
                <li><a href="#" className="hover:text-white">Advertise Your Products</a></li>
                <li><a href="#" className="hover:text-white">Become an Affiliate</a></li>
                <li><a href="#" className="hover:text-white">Fulfillment by Market</a></li>
              </ul>
            </div>
            {/* Let Us Help You */}
            <div>
              <h3 className="font-bold mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Help</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>© 2024 Market.in, Inc. or its affiliates. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellOnMarket;

