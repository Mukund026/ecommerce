import React from 'react';

const IconCard = ({ icon, label, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer bg-white group"
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-3 group-hover:bg-yellow-50 transition-colors">
        <span className="text-xl">{icon}</span>
      </div>
      <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">{label}</span>
    </div>
  );
};

export default IconCard;

