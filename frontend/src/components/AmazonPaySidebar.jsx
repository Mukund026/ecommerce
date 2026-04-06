import React from 'react';

const AmazonPaySidebar = () => {
  return (
    <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border p-6 h-fit sticky top-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Amazon Pay Balance</h2>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-3xl font-bold px-6 py-4 rounded-xl shadow-lg mb-6">
          ₹0.00
        </div>
      </div>
      
      <div className="space-y-4">
        <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm font-medium">
          <span className="w-5 h-5">➕</span>
          Add Money
        </button>
        
        <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium">
          <span className="w-5 h-5 text-yellow-500">🎁</span>
          Add Gift Card
        </button>
        
        <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium">
          <span className="w-5 h-5">⚙️</span>
          Account Settings
        </button>
      </div>
    </div>
  );
};

export default AmazonPaySidebar;

