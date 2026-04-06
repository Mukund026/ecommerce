import React from 'react';

const PromoBanner = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 p-6 rounded-xl shadow-lg mb-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/2">
          <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
          <p className="text-lg text-gray-800 leading-relaxed">{description}</p>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="w-64 h-48 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">📱✨</span> {/* Placeholder illustration */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;

